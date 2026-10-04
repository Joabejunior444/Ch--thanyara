/* ==========================================================================
   Envio do e-mail para a Thanyara, via EmailJS.

   O destinatário NÃO fica neste código: ele é definido no template do EmailJS
   (campo "To Email"). Variáveis que o template recebe:
     {{from_name}}      nome do convidado
     {{gift_name}}      presente escolhido
     {{gift_category}}  categoria do presente
     {{message}}        mensagem de carinho
     {{sent_at}}        data e hora do envio
   ========================================================================== */

(function () {
  "use strict";

  const cfg = window.CHA_CONFIG.emailjs;
  const configurado = Object.values(cfg).every((v) => v && !/COLE_AQUI/.test(v));
  const espera = (ms) => new Promise((r) => setTimeout(r, ms));

  async function enviar(d) {
    const params = {
      from_name: d.nomeConvidado,
      gift_name: d.presente,
      gift_category: d.categoria,
      message: d.mensagem,
      sent_at: new Date().toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "America/Sao_Paulo"
      })
    };

    if (!configurado) {
      // Na demonstração o e-mail é só simulado. Em produção, não configurar o
      // EmailJS é um erro: a tela de agradecimento avisa que o e-mail não saiu.
      if (window.ChaBackend.modoDemo) {
        await espera(700);
        console.info("[demonstração] E-mail simulado:", params);
        return { ok: true, simulado: true };
      }
      console.error("EmailJS não configurado em js/config.js.");
      return { ok: false, motivo: "nao-configurado" };
    }

    const controle = new AbortController();
    const limite = setTimeout(() => controle.abort(), 15000);
    try {
      const resposta = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: cfg.serviceId,
          template_id: cfg.templateId,
          user_id: cfg.publicKey,
          template_params: params
        }),
        signal: controle.signal
      });
      if (!resposta.ok) {
        console.error("EmailJS recusou o envio:", resposta.status, await resposta.text().catch(() => ""));
        return { ok: false, motivo: "recusado" };
      }
      return { ok: true };
    } catch (erro) {
      console.error("Falha ao chamar o EmailJS:", erro);
      return { ok: false, motivo: "rede" };
    } finally {
      clearTimeout(limite);
    }
  }

  window.ChaMailer = { enviar: enviar, configurado: configurado };
})();
