/*
  ============================================================
  DADOS DO KHANRU — edite aqui as listas de atividades!
  ============================================================

  Como funciona:
  - As listas seguem a mesma ordem das perguntas do site:
      juntos / separados  ->  cansados / dispostos  ->  tipo de atividade
  - Cada lista fica entre colchetes [ ], com os itens entre aspas
    e separados por vírgula. Exemplo:
        jogos: ["Overcooked", "Fortnite", "Minecraft"],

  Para ADICIONAR um item: escreva o nome entre aspas e coloque uma
  vírgula antes ou depois dele, junto com os outros da mesma lista.

  Para REMOVER um item: apague o nome dele (com as aspas e a vírgula).

  Atenção:
  - Um item só aparece no lugar onde estiver escrito. Se quiser que um
    jogo apareça em "juntos + cansados" E em "juntos + dispostos",
    adicione ele nas duas listas.
  - Não apague os colchetes [ ], as chaves { } nem os nomes antes dos
    dois-pontos (jogos:, filmes:, almoco:, leves: ...).
  - Uma lista vazia fica assim: []  -> o site simplesmente não mostra
    aquele grupo (ex.: "Pesadas" no almoço).
  - Se um tipo inteiro (ex.: faxina) não existir em um ramo, o site não
    oferece esse tipo naquela combinação.

  Comidas:
  - Quando estamos CANSADOS, comidas vai direto para almoco/janta
    (o tempo não importa, então o site não pergunta sobre tempo).
  - Quando estamos DISPOSTOS, comidas é dividida em poucoTempo e
    muitoTempo, e o site pergunta quanto tempo temos.
  - Dentro de almoco/janta, as opções ficam em "leves" e "pesadas".
*/

const DADOS = {
  juntos: {
    cansados: {
      // Marvel Rivals e TFT NÃO entram aqui
      jogos: ["Ragnarok MR", "Overcooked", "We Were Here", "Jogos Puzzle", "Silent Hill", "Fortnite"],

      filmes: ["American Horror Story", "Friends", "Modern Family", "Obsession", "Hunger Games"],

      // Cansados: o tempo não importa, então vai direto para almoço/janta
      comidas: {
        almoco: {
          leves: ["Subway", "Padaria", "Feijão", "Fricassê", "Comida de Forno", "Prato Feito/Jantinha", "Bife", "Massa", "Batata/Nugget", "Hamburguer e Batata"],
          pesadas: [],
        },
        janta: {
          leves: ["Subway", "Padaria", "Feijão", "Fricassê", "Prato Feito/Jantinha", "Comida de Forno", "Bife", "Massa", "Batata/Nugget", "Hamburguer e Batata"],
          pesadas: ["Pastel", "Cachorro Quente", "Frituras (Óleo)", "Hamburguer com acompanhamentos"],
        },
      },

      // Faxina NÃO aparece quando estamos cansados (por isso não tem a lista aqui)
    },

    dispostos: {
      jogos: ["Marvel Rivals", "TFT", "Ragnarok MR", "Overcooked", "We Were Here", "Jogos Puzzle", "Silent Hill", "Fortnite"],

      filmes: ["American Horror Story", "Friends", "Modern Family", "Obsession", "Hunger Games"],

      // Dispostos: primeiro separa por tempo, depois por almoço/janta
      comidas: {
        poucoTempo: {
          // Bife e Massa NÃO entram com pouco tempo
          almoco: {
            leves: ["Subway", "Padaria", "Feijão", "Fricassê", "Comida de Forno", "Prato Feito/Jantinha", "Batata/Nugget", "Hamburguer e Batata"],
            pesadas: [],
          },
          janta: {
            leves: ["Subway", "Padaria", "Feijão", "Fricassê", "Prato Feito/Jantinha", "Comida de Forno", "Batata/Nugget", "Hamburguer e Batata"],
            pesadas: ["Pastel", "Cachorro Quente", "Frituras (Óleo)", "Hamburguer com acompanhamentos"],
          },
        },
        muitoTempo: {
          almoco: {
            leves: ["Subway", "Padaria", "Feijão", "Fricassê", "Comida de Forno", "Prato Feito/Jantinha", "Bife", "Massa", "Batata/Nugget", "Hamburguer e Batata"],
            pesadas: [],
          },
          janta: {
            leves: ["Subway", "Padaria", "Feijão", "Fricassê", "Prato Feito/Jantinha", "Comida de Forno", "Bife", "Massa", "Batata/Nugget", "Hamburguer e Batata"],
            pesadas: ["Pastel", "Cachorro Quente", "Frituras (Óleo)", "Hamburguer com acompanhamentos"],
          },
        },
      },

      faxina: ["Quarto", "Escritório", "Cozinha", "Sala", "Banheiros", "Varanda"],
    },
  },

  // Separados não tem Comidas nem Faxina
  separados: {
    cansados: {
      // Marvel Rivals e TFT NÃO entram quando estamos cansados
      jogos: ["Ragnarok MR", "Overcooked", "We Were Here", "Jogos Puzzle", "Silent Hill", "Fortnite"],

      // American Horror Story e Obsession NÃO entram quando estamos separados
      filmes: ["Friends", "Modern Family", "Hunger Games"],
    },

    dispostos: {
      jogos: ["Marvel Rivals", "TFT", "Ragnarok MR", "Overcooked", "We Were Here", "Jogos Puzzle", "Silent Hill", "Fortnite"],

      filmes: ["Friends", "Modern Family", "Hunger Games"],
    },
  },
};
