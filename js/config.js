/* ==========================================================================
   CONFIGURAÇÕES — é aqui que você cola as chaves do Firebase e do EmailJS.
   Passo a passo completo no README.md.

   Enquanto os campos estiverem com "COLE_AQUI", o site roda em MODO DE
   DEMONSTRAÇÃO: as escolhas ficam só no navegador de quem está testando
   e nenhum e-mail é enviado. Serve para você ver o site funcionando.
   ========================================================================== */

window.CHA_CONFIG = {
  // Firebase → Configurações do projeto → Seus apps → app da Web → "firebaseConfig"
  firebase: {
    apiKey: "AIzaSyApTUFmjP1FL3acKlRWbIVHMQq_qsHKCqA",
    authDomain: "cha-thanyara.firebaseapp.com",
    projectId: "cha-thanyara",
    appId: "1:73284485532:web:b4fbdfabb2a5a5d1d5c859"
  },
  // EmailJS → Account (chave pública), Email Services (service id) e Email Templates (template id)
  emailjs: {
    publicKey: "VJXMSVniEk5-OMLMK",
    serviceId: "service_ky9iqqf",    // exemplo: service_ab12cde
   templateId: "template_nssb459"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  }
};
