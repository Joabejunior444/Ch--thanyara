/* ==========================================================================
   Lógica das telas: lista → formulário → agradecimento.
   Usa rotas por "#" para o botão voltar do celular funcionar:
     #/                       lista
     #/presentear/<id>        formulário do presente
     #/obrigado               agradecimento
   ========================================================================== */

(function () {
  "use strict";

  const { categorias, presentes } = window.CHA_DATA;
  const Backend = window.ChaBackend;
  const Mailer = window.ChaMailer;
  const Icones = window.ChaIcones;

  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => Array.from(raiz.querySelectorAll(sel));
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const presentePorId = new Map(presentes.map((p) => [p.id, p]));
  const categoriaPorId = new Map(categorias.map((c) => [c.id, c]));

  const telas = { lista: $("#view-lista"), form: $("#view-form"), obrigado: $("#view-obrigado") };
  const el = {
    lista: $("#lista"), chips: $("#chips"), placar: $("#placar"), soDisp: $("#so-disp"), aviso: $("#aviso"),
    bannerDemo: $("#banner-demo"), limparDemo: $("#limpar-demo"),
    form: $("#form"), nome: $("#nome"), msg: $("#msg"), cont: $("#cont"), btn: $("#btn-confirmar"), status: $("#status-envio"),
    erroNome: $("#erro-nome"), erroMsg: $("#erro-msg"), erroGeral: $("#erro-geral"),
    formArco: $("#form-arco"), formItem: $("#form-item"), formCat: $("#form-cat"),
    obTitulo: $("#ob-titulo"), obTexto: $("#ob-texto"), obArco: $("#ob-arco"), obItem: $("#ob-item"),
    obFalha: $("#ob-falha"), obCopiar: $("#ob-copiar"), obFalha: $("#ob-falha"), obCopiar: $("#ob-copiar"),
    btnAbrirPix: $("#btn-abrir-pix"), areaPix: $("#area-pix"),
    btnCopiarPix: $("#btn-copiar-pix"), chavePix: $("#chave-pix")
  };

  let reservados = new Set();
  let estadoCarregado = false;
  let semConexao = false;
  let enviando = false;
  let itemAtual = null;
  let ultimaReserva = null;
  let scrollLista = 0;
  let ultimoBotao = null;
  const cartas = new Map(); // id do presente → { li, btn, status }

  const MENSAGENS_ERRO = {
    rede: "Não foi possível reservar agora. Confira sua conexão e tente de novo.",
    regras: "Não foi possível reservar agora. Tente de novo em instantes.",
    outro: "Não foi possível reservar agora. Tente de novo em instantes."
  };

  /* ------------------------------- desenho ------------------------------- */

  function midia(p) {
    if (p.foto) return `<img src="${esc(p.foto)}" alt="" loading="lazy" decoding="async">`;
    return Icones.svg(p.icone);
  }

  const ICONE_OK = '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false"><path class="ln" d="M4.5 10.5l3.5 3.5 7.5-8.5"/></svg>';

  function htmlCarta(p) {
    return `
      <li class="item" data-id="${esc(p.id)}" data-cat="${esc(p.categoria)}">
        <div class="item__arco">
          ${midia(p)}
          <span class="item__selo" aria-hidden="true">Reservado</span>
        </div>
        <h3 class="item__nome">${esc(p.nome)}</h3>
        <button type="button" class="btn btn--presentear" data-presentear="${esc(p.id)}" disabled>Presentear</button>
        <p class="item__status" hidden>${ICONE_OK} Já escolhido</p>
      </li>`;
  }

  function renderLista() {
    el.lista.innerHTML = categorias.map((c) => `
      <section class="comodo" id="${esc(c.id)}" aria-labelledby="t-${esc(c.id)}">
        <header class="comodo__cab">
          <h2 id="t-${esc(c.id)}">${esc(c.nome)}</h2>
          <p class="comodo__cont" data-cont="${esc(c.id)}"></p>
        </header>
        <ul class="grade">${presentes.filter((p) => p.categoria === c.id).map(htmlCarta).join("")}</ul>
        <p class="vazio" data-vazio="${esc(c.id)}" hidden>Todos os itens desta seção já foram escolhidos.</p>
      </section>`).join("");

    $$(".item", el.lista).forEach((li) => {
      cartas.set(li.dataset.id, { li, btn: $("[data-presentear]", li), status: $(".item__status", li) });
    });

    // Se uma foto não carregar, volta para o desenho.
    el.lista.addEventListener("error", (ev) => {
      const img = ev.target;
      if (!(img instanceof HTMLImageElement)) return;
      const p = presentePorId.get(img.closest(".item").dataset.id);
      img.outerHTML = Icones.svg(p.icone);
    }, true);

    el.chips.innerHTML = categorias.map((c) =>
      `<button type="button" class="chip" data-ir="${esc(c.id)}">${esc(c.nome)}</button>`).join("");
  }

  function aplicarReservas() {
    cartas.forEach((carta, id) => {
      const tomado = reservados.has(id);
      carta.li.classList.toggle("is-reservado", tomado);
      carta.btn.hidden = tomado;
      carta.status.hidden = !tomado;
    });
    atualizarContagens();
  }

  function atualizarContagens() {
    const total = presentes.length;
    const livres = presentes.filter((p) => !reservados.has(p.id)).length;

    if (semConexao) el.placar.textContent = "Não foi possível atualizar a lista agora.";
    else if (!estadoCarregado) el.placar.textContent = "Carregando a lista…";
    else if (livres === 0) el.placar.textContent = "Todos os presentes já foram escolhidos. Obrigado a todos!";
    else el.placar.textContent = `${livres} de ${total} presentes ainda disponíveis`;

    categorias.forEach((c) => {
      const itens = presentes.filter((p) => p.categoria === c.id);
      const l = itens.filter((p) => !reservados.has(p.id)).length;
      $(`[data-cont="${c.id}"]`).textContent = !estadoCarregado ? "" : l === 0 ? "Todos escolhidos" : `${l} de ${itens.length} disponíveis`;
      $(`[data-vazio="${c.id}"]`).hidden = !(el.soDisp.checked && estadoCarregado && l === 0);
    });
  }

  function liberarLista() {
    el.lista.classList.remove("is-carregando");
    cartas.forEach((carta) => { carta.btn.disabled = false; });
  }

  /* ------------------------------- telas ------------------------------- */

  function mostrar(nome) {
    Object.keys(telas).forEach((k) => { telas[k].hidden = k !== nome; });
  }

  function abrirLista() {
    mostrar("lista");
    window.scrollTo(0, scrollLista);
    if (ultimoBotao && cartas.has(ultimoBotao)) {
      const b = cartas.get(ultimoBotao).btn;
      if (!b.hidden) b.focus({ preventScroll: true });
    }
    ultimoBotao = null;
  }

  function abrirForm(p) {
    if (!telas.lista.hidden) scrollLista = window.scrollY;
    itemAtual = p;
    enviando = false;
    mostrar("form");

    el.formArco.dataset.cat = p.categoria;
  el.formItem.textContent = p.nome;
  if (p.categoria === 'pix') {
    el.formArco.innerHTML = p.icone;
    el.formCat.textContent = "Valor Livre";
  } else {
    el.formArco.innerHTML = midia(p);
    el.formCat.textContent = categoriaPorId.get(p.categoria).nome;
  }

    el.form.reset();
    limparErros();
    atualizarContador();
    definirBotao("Confirmar presente", false);
    liberarCampos(true);

    if (reservados.has(p.id)) bloquearForm();
    window.scrollTo(0, 0);
    el.formItem.focus({ preventScroll: true });
  }

  function abrirObrigado() {
    const r = ultimaReserva;
    mostrar("obrigado");

    el.obArco.dataset.cat = r.item.categoria;
    el.obItem.textContent = r.item.nome;

    if (r.item.categoria === 'pix') {
      // Textos que fazem sentido antes do pagamento:
      el.obTitulo.textContent = "Falta pouco, " + r.nome.split(/\s+/)[0] + "!";
      el.obTexto.textContent = "A Thanyara já recebeu a sua mensagem de carinho por e-mail. Para concluir a sua contribuição, faça o Pix abaixo:";
      el.obArco.innerHTML = r.item.icone;
      if (el.areaPix) el.areaPix.hidden = false;
    } else {
      // Textos originais para os presentes físicos:
      el.obTitulo.textContent = "Obrigado, " + r.nome.split(/\s+/)[0] + "!";
      el.obTexto.textContent = r.emailOk
        ? "O seu presente está reservado e a Thanyara já recebeu o seu recado por e-mail."
        : "O seu presente está reservado.";
      el.obArco.innerHTML = midia(r.item);
      if (el.areaPix) el.areaPix.hidden = true;
    }

    window.scrollTo(0, 0);
    el.obTitulo.focus({ preventScroll: true });
  }

  function rota() {
    const [parte, id] = location.hash.replace(/^#\/?/, "").split("/");
    if (parte === "presentear" && presentePorId.has(id)) return abrirForm(presentePorId.get(id));
    if (parte === "obrigado" && ultimaReserva) return abrirObrigado();
    if (parte) history.replaceState(null, "", location.pathname + location.search);
    abrirLista();
  }

  function irParaLista() {
    if (location.hash && location.hash !== "#/") location.hash = "#/";
    else abrirLista();
  }

  /* ------------------------------- formulário ------------------------------- */

  function definirBotao(texto, ocupado) {
    el.btn.textContent = texto;
    el.btn.disabled = ocupado;
    el.status.textContent = ocupado ? texto : "";
  }

  function liberarCampos(sim) {
    el.nome.disabled = !sim;
    el.msg.disabled = !sim;
  }

  function limparErros() {
    [el.erroNome, el.erroMsg, el.erroGeral].forEach((e) => { e.hidden = true; e.textContent = ""; });
    el.nome.removeAttribute("aria-invalid");
    el.msg.removeAttribute("aria-invalid");
  }

  function mostrarErroCampo(campo, aviso, texto) {
    aviso.textContent = texto;
    aviso.hidden = false;
    campo.setAttribute("aria-invalid", "true");
  }

  function mostrarErroGeral(texto) {
    el.erroGeral.textContent = texto;
    el.erroGeral.hidden = false;
  }

  function atualizarContador() {
    el.cont.textContent = String(el.msg.value.length);
  }

  function bloquearForm() {
    mostrarErroGeral("Esse presente acabou de ser escolhido por outra pessoa. Volte para a lista e escolha outro item.");
    el.btn.disabled = true;
    liberarCampos(false);
  }

  function verificarFormBloqueado() {
    if (!telas.form.hidden && itemAtual && !enviando && reservados.has(itemAtual.id)) bloquearForm();
  }

  function validar() {
    limparErros();
    const nome = el.nome.value.trim();
    const msg = el.msg.value.trim();
    let primeiroErro = null;

    if (nome.length < 2) {
      mostrarErroCampo(el.nome, el.erroNome, "Escreva seu nome.");
      primeiroErro = el.nome;
    }
    if (msg.length < 2) {
      mostrarErroCampo(el.msg, el.erroMsg, "Escreva uma mensagem de carinho para a Thanyara.");
      primeiroErro = primeiroErro || el.msg;
    }
    if (primeiroErro) {
      primeiroErro.focus();
      return null;
    }
    return { nome, msg };
  }

  async function aoEnviar(ev) {
    ev.preventDefault();
    if (enviando || !itemAtual) return;
    const dados = validar();
    if (!dados) return;

    const item = itemAtual;
    enviando = true;
    definirBotao("Reservando o presente…", true);

    const reserva = await Backend.reservar({
      id: item.id,
      nomePresente: item.nome,
      nomeConvidado: dados.nome,
      mensagem: dados.msg
    });

    if (!reserva.ok) {
      enviando = false;
      if (reserva.motivo === "ja-reservado") {
        reservados.add(item.id);
        aplicarReservas();
        bloquearForm();
        definirBotao("Confirmar presente", true);
      } else {
        definirBotao("Confirmar presente", false);
        mostrarErroGeral(MENSAGENS_ERRO[reserva.motivo] || MENSAGENS_ERRO.outro);
      }
      return;
    }

    definirBotao("Avisando a Thanyara…", true);
    const email = await Mailer.enviar({
      nomeConvidado: dados.nome,
      presente: item.nome,
      // 👇 Essa linha mudou para não dar erro no Pix 👇
      categoria: item.categoria === 'pix' ? "Valor Livre" : categoriaPorId.get(item.categoria).nome,
      mensagem: dados.msg
    });

    ultimaReserva = { nome: dados.nome, mensagem: dados.msg, item, emailOk: email.ok };
    location.replace("#/obrigado");
  }

  async function copiarRecado() {
    const r = ultimaReserva;
    if (!r) return;
    const texto = `Oi, Thanyara! Vou te dar: ${r.item.nome}.\n\n${r.mensagem}\n\n${r.nome}`;
    try {
      await navigator.clipboard.writeText(texto);
      el.obCopiar.textContent = "Recado copiado";
    } catch (_) {
      el.obCopiar.textContent = "Não foi possível copiar";
    }
    setTimeout(() => { el.obCopiar.textContent = "Copiar meu recado"; }, 2500);
  }

  /* ------------------------------- navegação da lista ------------------------------- */

  function configurarChips() {
    el.chips.addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-ir]");
      if (!b) return;
      document.getElementById(b.dataset.ir).scrollIntoView({ behavior: reduzMovimento ? "auto" : "smooth", block: "start" });
    });

    if (!("IntersectionObserver" in window)) return;
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        $$(".chip", el.chips).forEach((c) => {
          if (c.dataset.ir === e.target.id) c.setAttribute("aria-current", "true");
          else c.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    $$(".comodo", el.lista).forEach((s) => observador.observe(s));
  }

  /* ------------------------------- início ------------------------------- */

  function iniciar() {
    renderLista();
    configurarChips();
    atualizarContagens();

    el.lista.addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-presentear]");
      if (!b || b.disabled) return;
      ultimoBotao = b.dataset.presentear;
      location.hash = "#/presentear/" + b.dataset.presentear;
    });

    el.soDisp.addEventListener("change", () => {
      el.lista.classList.toggle("so-disponiveis", el.soDisp.checked);
      atualizarContagens();
    });

    el.form.addEventListener("submit", aoEnviar);
    el.msg.addEventListener("input", atualizarContador);
    el.nome.addEventListener("input", () => { el.erroNome.hidden = true; el.nome.removeAttribute("aria-invalid"); });
    el.msg.addEventListener("input", () => { el.erroMsg.hidden = true; el.msg.removeAttribute("aria-invalid"); });
    el.obCopiar.addEventListener("click", copiarRecado);
    $$("[data-voltar]").forEach((b) => b.addEventListener("click", irParaLista));

    // 👇 COLE AQUI 👇
    if (el.btnAbrirPix) {
      el.btnAbrirPix.addEventListener("click", () => {
        const idPix = "pix-" + Date.now(); 
        const p = {
          id: idPix,
          nome: "Contribuição em Dinheiro",
          categoria: "pix",
          icone: '<svg viewBox="0 0 24 24" width="48" height="48" class="ln f-gema" style="margin:auto"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
        };
        presentePorId.set(idPix, p);
        location.hash = "#/presentear/" + idPix;
      });
    }

    if (el.btnCopiarPix) {
      el.btnCopiarPix.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(el.chavePix.textContent);
          el.btnCopiarPix.textContent = "Chave copiada!";
        } catch (_) {
          el.btnCopiarPix.textContent = "Erro";
        }
        setTimeout(() => el.btnCopiarPix.textContent = "Copiar Chave", 2000);
      });
    }
   if (Backend.modoDemo) {
      el.bannerDemo.hidden = false;
      el.limparDemo.addEventListener("click", () => Backend.limparDemo());
    }

    // 👇 ADICIONE ESTAS DUAS LINHAS AQUI 👇
    window.addEventListener("hashchange", rota);
    rota();

    // Se a lista em tempo real demorar, libera os botões mesmo assim:
    // a reserva só vale se o servidor aceitar, então não há risco de duplicar.
    const espera = setTimeout(() => {
      el.aviso.textContent = "A conexão está lenta. A lista atualiza sozinha assim que os dados chegarem.";
      el.aviso.hidden = false;
      liberarLista();
    }, 8000);

    Backend.escutar(
      (ids) => {
        clearTimeout(espera);
        reservados = ids;
        estadoCarregado = true;
        semConexao = false;
        el.aviso.hidden = true;
        aplicarReservas();
        liberarLista();
        verificarFormBloqueado();
      },
      (erro) => {
        clearTimeout(espera);
        console.error("Falha ao acompanhar a lista em tempo real:", erro);
        semConexao = true;
        el.aviso.textContent = "Não foi possível carregar a lista em tempo real. Atualize a página para tentar de novo.";
        el.aviso.hidden = false;
        atualizarContagens();
        liberarLista();
      }
    );

  }

  iniciar();
})();
