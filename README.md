# Lista de Presentes — Chá de Casa Nova da Thanyara

Site estático (HTML, CSS e JavaScript puro) com banco de dados em tempo real no **Firebase (Cloud Firestore)** e e-mail automático pelo **EmailJS**. Não precisa de servidor próprio.

## O que o site faz

1. A vitrine mostra os presentes por categoria (Cozinha e utilidades, Eletrodomésticos, Cama, mesa, banho e lavanderia), cada um com ilustração, nome e botão **Presentear**.
2. Ao clicar em **Presentear**, o convidado vai para a tela do formulário (**Seu nome** e **Mensagem de carinho para a Thanyara**), com o item que está reservando em destaque.
3. Ao clicar em **Confirmar presente**, o site:
   - reserva o item no Firestore, numa transação que impede dois convidados de escolherem o mesmo presente;
   - envia o e-mail para a Thanyara (nome, presente e mensagem);
   - mostra a tela de agradecimento.
4. Todo mundo que está com o site aberto vê o item mudar para **Já escolhido** (apagado e riscado) na hora, sem recarregar a página.

## Estrutura de pastas

```
cha-casa-nova/
├── index.html              página única (lista, formulário e agradecimento)
├── favicon.svg
├── css/
│   └── styles.css          todo o visual
├── js/
│   ├── config.js           ← AQUI você cola as chaves do Firebase e do EmailJS
│   ├── gifts-data.js       ← AQUI você edita a lista de presentes
│   ├── icons.js            ilustrações dos presentes
│   ├── backend.js          Firestore em tempo real e reserva (com modo demonstração)
│   ├── mailer.js           envio do e-mail pelo EmailJS
│   └── app.js              telas e navegação
├── img/                    nossa-senhora.png (imagem do topo) e, se quiser, fotos reais dos produtos
├── firestore.rules         regras de segurança do banco
├── firebase.json           configuração de publicação
├── .firebaserc             id do seu projeto Firebase
├── emailjs-template.html   modelo do e-mail que a Thanyara recebe
└── README.md
```

## Antes de configurar: veja funcionando

Abra o `index.html` com dois cliques. Enquanto `js/config.js` estiver com "COLE_AQUI", o site roda em **modo de demonstração**: tudo funciona, mas as escolhas ficam só no seu navegador e nenhum e-mail é enviado. Uma faixa no topo avisa isso e tem um botão para limpar as reservas de teste. Abra o site em duas abas para ver o item ficar riscado nas duas.

---

## Passo 1 — Firebase (banco de dados em tempo real)

1. Entre em <https://console.firebase.google.com> com uma conta Google e clique em **Criar um projeto**. Dê um nome (ex.: `casa-nova-thanyara`). O Google Analytics pode ficar desativado.
2. No menu lateral, abra **Build → Firestore Database → Criar banco de dados**.
   - Escolha uma região próxima, como `southamerica-east1` (São Paulo).
   - Escolha **iniciar no modo de produção**.
3. Ainda no Firestore, abra a aba **Regras**, apague o que estiver lá, cole todo o conteúdo de `firestore.rules` e clique em **Publicar**.
4. Volte à tela inicial do projeto e clique no ícone **Web** (`</>`) para registrar um app. Dê um apelido e **não** marque o Firebase Hosting por enquanto. O Firebase vai mostrar um bloco `firebaseConfig`.
5. Abra `js/config.js` e copie para ele os quatro valores: `apiKey`, `authDomain`, `projectId` e `appId`.

> A `apiKey` do Firebase pode ficar no código do site: ela só identifica o projeto. Quem protege os dados são as regras do passo 3.

## Passo 2 — EmailJS (e-mail automático)

1. Crie uma conta em <https://www.emailjs.com>.
2. Em **Email Services → Add New Service**, conecte o e-mail que vai **enviar** as mensagens (pode ser um Gmail). Copie o **Service ID**.
3. Em **Email Templates → Create New Template**:
   - **To Email**: o e-mail da Thanyara (a pessoa que vai receber os recados).
   - **Subject**: `{{from_name}} vai te dar: {{gift_name}}`
   - Abra o editor de conteúdo em modo código (Code Editor) e cole o conteúdo de `emailjs-template.html`.
   - Salve e copie o **Template ID**.
4. Em **Account → General**, copie a **Public Key**.
5. Cole os três valores (`publicKey`, `serviceId`, `templateId`) em `js/config.js`.

Variáveis que o site envia ao template: `from_name`, `gift_name`, `gift_category`, `message` e `sent_at`.

Depois que o site estiver no ar, procure no painel do EmailJS (em **Security**) a opção de permitir chamadas só do endereço do seu site. Confira também o limite mensal de e-mails do seu plano no site do EmailJS.

## Passo 3 — Testar antes de divulgar

Com as duas configurações coladas, abra o site e confirme um presente de teste:

- o item deve ficar **Já escolhido** em todas as abas abertas;
- o e-mail deve chegar para a Thanyara;
- no Firebase, o documento aparece em **Firestore → reserved**, e o nome e a mensagem em **messages**.

Para rodar localmente com o Firebase real, é melhor usar um servidor local em vez de abrir o arquivo direto:

```
cd cha-casa-nova
python3 -m http.server 8080
```

e abrir <http://localhost:8080>.

Depois do teste, **apague o documento de teste** em `reserved` (e o de `messages`) pelo painel do Firebase para liberar o item.

## Passo 4 — Colocar no ar

**Opção A — Firebase Hosting (já está pronto para isso)**

1. Instale o Node.js e rode `npm install -g firebase-tools`.
2. Edite `.firebaserc` e troque `COLE-AQUI-O-ID-DO-SEU-PROJETO` pelo ID do projeto (o mesmo `projectId` do `config.js`).
3. Na pasta do site: `firebase login` e depois `firebase deploy`.
4. O comando mostra o endereço final (algo como `https://seu-projeto.web.app`). É esse link que você manda no WhatsApp.

**Opção B — Netlify, Vercel ou GitHub Pages**

O site é estático. No Netlify, por exemplo, basta arrastar a pasta inteira para <https://app.netlify.com/drop>.

## Como gerenciar durante o evento

- **Ler as mensagens**: Firebase → Firestore → coleção `messages`. Cada documento tem o nome do convidado, a mensagem e o presente.
- **Liberar um presente** (alguém desistiu): apague o documento do item na coleção `reserved`. O site volta a mostrá-lo como disponível em tempo real.
- **Mudar a lista**: edite `js/gifts-data.js` (o comentário no topo explica cada campo). Não mude o `id` de itens já reservados.
- **Usar fotos reais**: coloque as imagens na pasta `img/` e preencha o campo `foto` do item, por exemplo `foto: "img/air-fryer.jpg"`. Sem foto, aparece a ilustração.
- **Prévia no WhatsApp**: em `index.html`, publique uma imagem 1200 x 630 e ative a linha `og:image` que está comentada.

## Como a duplicidade é evitada

- Cada reserva é um documento em `reserved` cujo id é o id do presente. Só pode existir um.
- O site grava numa transação: se o documento já existe, a reserva é recusada e o convidado vê o aviso de que o item acabou de ser escolhido.
- As regras do Firestore reforçam isso no servidor: o documento só pode ser criado (nunca alterado ou apagado) e só junto com a mensagem do mesmo presente.
- As mensagens ficam numa coleção que o site não consegue ler. Os outros convidados veem só que o item foi escolhido, sem nome e sem recado.

## Limitações a conhecer

- Qualquer pessoa com o link pode reservar itens. Se o link for só para os convidados, isso não deve ser problema. Se precisar de mais proteção, o caminho é exigir login (Firebase Authentication) ou ativar o App Check.
- Se o e-mail falhar, a reserva continua valendo. A tela de agradecimento avisa o convidado e oferece copiar o recado para mandar por WhatsApp. A mensagem também fica salva em `messages`.
