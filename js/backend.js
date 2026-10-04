/* ==========================================================================
   Banco de dados em tempo real.

   - Com o Firebase configurado: usa o Cloud Firestore.
       coleção "reserved"  → um documento por presente reservado (público, só leitura)
       coleção "messages"  → nome, mensagem e presente de cada convidado (privado:
                             só você lê, pelo painel do Firebase)
     A reserva é feita numa transação: se duas pessoas confirmarem o mesmo item
     ao mesmo tempo, só a primeira passa. As regras (firestore.rules) reforçam isso
     no servidor.

   - Sem o Firebase configurado: MODO DEMONSTRAÇÃO, guardando no navegador.
   ========================================================================== */

(function () {
  "use strict";

  const cfg = window.CHA_CONFIG.firebase;
  const pronto = (obj) => Object.values(obj).every((v) => v && !/COLE_AQUI/.test(v));
  const modoDemo = !pronto(cfg);

  const SDK = "https://www.gstatic.com/firebasejs/10.14.1/";
  let dbPromessa = null;

  function carregarScript(src) {
    return new Promise((ok, falha) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = ok;
      s.onerror = () => falha(new Error("Não foi possível carregar " + src));
      document.head.appendChild(s);
    });
  }

  function iniciarFirebase() {
    if (!dbPromessa) {
      dbPromessa = (async () => {
        await carregarScript(SDK + "firebase-app-compat.js");
        await carregarScript(SDK + "firebase-firestore-compat.js");
        const app = window.firebase.initializeApp(cfg);
        return app.firestore();
      })();
    }
    return dbPromessa;
  }

  /* ------------------------- modo real (Firestore) ------------------------- */

  async function escutarFirebase(aoMudar, aoFalhar) {
    try {
      const db = await iniciarFirebase();
      db.collection("reserved").onSnapshot(
        (snap) => {
          const ids = new Set();
          snap.forEach((d) => ids.add(d.id));
          aoMudar(ids);
        },
        (erro) => aoFalhar(erro)
      );
    } catch (erro) {
      aoFalhar(erro);
    }
  }

  async function reservarFirebase(d) {
    let db;
    try {
      db = await iniciarFirebase();
    } catch (erro) {
      console.error(erro);
      return { ok: false, motivo: "rede" };
    }
    const FieldValue = window.firebase.firestore.FieldValue;
    const refReserva = db.collection("reserved").doc(d.id);
    const refMensagem = db.collection("messages").doc(d.id);

    try {
      await db.runTransaction(async (tx) => {
        const atual = await tx.get(refReserva);
        if (atual.exists) throw new Error("JA_RESERVADO");
        tx.set(refReserva, { takenAt: FieldValue.serverTimestamp() });
        tx.set(refMensagem, {
          guestName: d.nomeConvidado,
          message: d.mensagem,
          giftName: d.nomePresente,
          createdAt: FieldValue.serverTimestamp()
        });
      });
      return { ok: true };
    } catch (erro) {
      if (erro && erro.message === "JA_RESERVADO") return { ok: false, motivo: "ja-reservado" };
      if (erro && erro.code === "permission-denied") {
        // Ou o item foi tomado no mesmo instante, ou as regras não estão publicadas.
        try {
          const doc = await refReserva.get();
          if (doc.exists) return { ok: false, motivo: "ja-reservado" };
        } catch (_) { /* ignora */ }
        console.error("Permissão negada ao reservar. Confira se firestore.rules foi publicado.", erro);
        return { ok: false, motivo: "regras" };
      }
      console.error(erro);
      return { ok: false, motivo: "rede" };
    }
  }

  /* --------------------- modo demonstração (localStorage) --------------------- */

  const CHAVE_DEMO = "cha-demo-reservas";
  const ouvintesDemo = new Set();

  function lerDemo() {
    try {
      return new Set(JSON.parse(localStorage.getItem(CHAVE_DEMO) || "[]"));
    } catch (_) {
      return new Set();
    }
  }
  function gravarDemo(conjunto) {
    try {
      localStorage.setItem(CHAVE_DEMO, JSON.stringify(Array.from(conjunto)));
    } catch (_) { /* navegador sem armazenamento */ }
  }
  function avisarDemo() {
    const ids = lerDemo();
    ouvintesDemo.forEach((fn) => fn(new Set(ids)));
  }

  function escutarDemo(aoMudar) {
    ouvintesDemo.add(aoMudar);
    // Reflete mudanças feitas em outras abas, simulando o tempo real.
    window.addEventListener("storage", (e) => {
      if (e.key === CHAVE_DEMO) avisarDemo();
    });
    setTimeout(() => aoMudar(lerDemo()), 250);
  }

  async function reservarDemo(d) {
    await new Promise((r) => setTimeout(r, 600));
    const ids = lerDemo();
    if (ids.has(d.id)) return { ok: false, motivo: "ja-reservado" };
    ids.add(d.id);
    gravarDemo(ids);
    avisarDemo();
    return { ok: true };
  }

  function limparDemo() {
    try {
      localStorage.removeItem(CHAVE_DEMO);
    } catch (_) { /* ignora */ }
    avisarDemo();
  }

  /* ------------------------------ interface pública ------------------------------ */

  window.ChaBackend = {
    modoDemo: modoDemo,
    escutar: (aoMudar, aoFalhar) => (modoDemo ? escutarDemo(aoMudar) : escutarFirebase(aoMudar, aoFalhar)),
    reservar: (dados) => (modoDemo ? reservarDemo(dados) : reservarFirebase(dados)),
    limparDemo: limparDemo
  };
})();
