/* ==========================================================================
   LISTA DE PRESENTES — edite à vontade.

   Cada presente tem:
     id         identificador único: só letras minúsculas sem acento, números e "-"
                (ex.: "air-fryer"). NÃO mude o id depois que o site estiver no ar,
                porque é ele que liga o presente à reserva no banco de dados.
     categoria  "cozinha", "eletro" ou "cama-mesa-banho"
     nome       texto que aparece no cartão e no e-mail
     icone      desenho que aparece enquanto não houver foto (lista abaixo)
     foto       (opcional) caminho ou endereço de uma foto real do produto,
                ex.: "img/air-fryer.jpg". Se a foto não carregar, o desenho aparece.

   Desenhos disponíveis em "icone":
     cozinha: travessas, jarra, lixeira, pizza, utensilios, formabolo, pressao, panela,
              cuscuzeira, sobremesa, pratos, talheres, pote, mantimentos, boleira,
              escorredor, mop, tempero, frigideira, xicaras, escorredorpratos, relogio,
              facas, copos, tabua, chaleira
     eletro:  sanduicheira, aspiradorvertical, ferro, ventilador, multiprocessador, mixer,
              espremedor, airfryer, batedeira, panelaarroz, liquidificador,
              chaleiraeletrica, torradeira, aspirador, cafeteira, microondas
     cama:    toalhas, jogobanheiro, cama, edredom, travesseiro, tapete, panoprato,
              toalhademesa, varal, tabuapassar, cobertor, americano, cortina, roupao
     outro:   presente (caixa com laço, usado quando o icone não existe)
   ========================================================================== */

window.CHA_DATA = {
  categorias: [
    { id: "cozinha", nome: "Cozinha e utilidades" },
    { id: "eletro", nome: "Eletrodomésticos" },
    { id: "cama-mesa-banho", nome: "Cama, mesa, banho e lavanderia" }
  ],

  presentes: [
    /* ---------- Cozinha e utilidades ---------- */
    { id: "travessas-refratarios", categoria: "cozinha", nome: "Travessas / refratários", icone: "travessas" },
    { id: "jarra-de-vidro", categoria: "cozinha", nome: "Jarra de vidro para suco / água", icone: "jarra" },
    { id: "lixeira-inox", categoria: "cozinha", nome: "Lixeira redonda em aço inox", icone: "lixeira" },
    { id: "formas-pizza", categoria: "cozinha", nome: "Kit formas para pizza", icone: "pizza" },
    { id: "utensilios-inox", categoria: "cozinha", nome: "Kit utensílios de cozinha inox", icone: "utensilios" },
    { id: "formas-bolo", categoria: "cozinha", nome: "Kit formas para bolo", icone: "formabolo" },
    { id: "panela-de-pressao", categoria: "cozinha", nome: "Panela de pressão (fechamento externo)", icone: "pressao" },
    { id: "jogo-de-panelas", categoria: "cozinha", nome: "Jogo de panelas", icone: "panela" },
    { id: "cuscuzeira", categoria: "cozinha", nome: "Cuscuzeira inox", icone: "cuscuzeira" },
    { id: "jogo-de-sobremesa", categoria: "cozinha", nome: "Jogo de sobremesa", icone: "sobremesa" },
    { id: "pratos-fundos", categoria: "cozinha", nome: "Jogo de pratos fundos", icone: "pratos" },
    { id: "faqueiro", categoria: "cozinha", nome: "Faqueiro inox", icone: "talheres" },
    { id: "potes-multiuso", categoria: "cozinha", nome: "Potes plásticos multiuso", icone: "pote" },
    { id: "potes-mantimentos", categoria: "cozinha", nome: "Potes de mantimentos", icone: "mantimentos" },
    { id: "boleira", categoria: "cozinha", nome: "Boleira", icone: "boleira" },
    { id: "escorredor-massas", categoria: "cozinha", nome: "Escorredor de massas / legumes", icone: "escorredor" },
    { id: "vassoura-mop", categoria: "cozinha", nome: "Vassoura mop spray", icone: "mop" },
    { id: "porta-tempero", categoria: "cozinha", nome: "Porta tempero", icone: "tempero" },
    { id: "frigideiras", categoria: "cozinha", nome: "Kit frigideiras Tramontina", icone: "frigideira" },
    { id: "jogo-de-xicaras", categoria: "cozinha", nome: "Jogo de xícaras", icone: "xicaras" },
    { id: "escorredor-de-pratos", categoria: "cozinha", nome: "Escorredor de pratos", icone: "escorredorpratos" },
    { id: "relogio-de-parede", categoria: "cozinha", nome: "Relógio de parede", icone: "relogio" },

    /* ---------- Eletrodomésticos ---------- */
    { id: "sanduicheira", categoria: "eletro", nome: "Sanduicheira grill", icone: "sanduicheira" },
    { id: "aspirador-vertical", categoria: "eletro", nome: "Aspirador de pó vertical 2 em 1", icone: "aspiradorvertical" },
    { id: "ferro-de-passar", categoria: "eletro", nome: "Ferro de passar", icone: "ferro" },
    { id: "ventilador", categoria: "eletro", nome: "Ventilador", icone: "ventilador" },
    { id: "multiprocessador", categoria: "eletro", nome: "Multiprocessador de alimentos", icone: "multiprocessador" },
    { id: "mixer", categoria: "eletro", nome: "Mixer 3 em 1", icone: "mixer" },
    { id: "espremedor", categoria: "eletro", nome: "Espremedor de frutas", icone: "espremedor" },
    { id: "air-fryer", categoria: "eletro", nome: "Air fryer Oster", icone: "airfryer" },
    { id: "batedeira", categoria: "eletro", nome: "Batedeira planetária", icone: "batedeira" },
    { id: "panela-de-arroz", categoria: "eletro", nome: "Panela de arroz elétrica", icone: "panelaarroz" },
    { id: "liquidificador", categoria: "eletro", nome: "Liquidificador", icone: "liquidificador" },
    { id: "chaleira-eletrica", categoria: "eletro", nome: "Chaleira elétrica", icone: "chaleiraeletrica" },
    { id: "torradeira", categoria: "eletro", nome: "Torradeira", icone: "torradeira" },

    /* ---------- Cama, mesa, banho e lavanderia ---------- */
    { id: "jogo-de-toalhas", categoria: "cama-mesa-banho", nome: "Jogo de toalhas de banho", icone: "toalhas" },
    { id: "jogo-de-banheiro", categoria: "cama-mesa-banho", nome: "Jogo de banheiro", icone: "jogobanheiro" },
    { id: "jogo-de-cama", categoria: "cama-mesa-banho", nome: "Jogo de cama", icone: "cama" },
    { id: "colcha-manta", categoria: "cama-mesa-banho", nome: "Colcha / manta para casal", icone: "edredom" },
    { id: "travesseiros", categoria: "cama-mesa-banho", nome: "Kit 2 travesseiros", icone: "travesseiro" },
    { id: "tapetes", categoria: "cama-mesa-banho", nome: "Tapetes", icone: "tapete" },
    { id: "pano-de-prato", categoria: "cama-mesa-banho", nome: "Pano de prato", icone: "panoprato" },
    { id: "toalha-de-mesa", categoria: "cama-mesa-banho", nome: "Toalha de mesa", icone: "toalhademesa" },
    { id: "varal-de-chao", categoria: "cama-mesa-banho", nome: "Varal de chão", icone: "varal" },
    { id: "tabua-de-passar", categoria: "cama-mesa-banho", nome: "Tábua de passar roupa", icone: "tabuapassar" }
  ]
};
