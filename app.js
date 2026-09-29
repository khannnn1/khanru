/*
  Lógica do Khanru.
  As listas de atividades ficam no data.js — normalmente você não
  precisa mexer neste arquivo para adicionar ou remover itens.
*/

// Nomes bonitos (e emojis) que aparecem nos botões
const TIPOS = {
  jogos: { texto: "Jogos", emoji: "🎮" },
  filmes: { texto: "Filmes/Séries", emoji: "🍿" },
  comidas: { texto: "Comidas", emoji: "🍝" },
  faxina: { texto: "Faxina", emoji: "🧹" },
};

const GRUPOS_COMIDA = {
  leves: "Leves",
  pesadas: "Pesadas",
};

/* ---------- Regras (não mexem na tela) ---------- */

// Pega o "galho" dos dados para juntos/separados + cansados/dispostos
function ramoAtual(estado) {
  return DADOS[estado.companhia][estado.energia];
}

// Tipos de atividade que existem para a combinação escolhida
function tiposDisponiveis(estado) {
  const ramo = ramoAtual(estado);
  return Object.keys(TIPOS).filter((tipo) => ramo[tipo] !== undefined);
}

// Só pergunta sobre tempo se, nos dados, as comidas forem divididas por tempo
// (isso só acontece quando estamos dispostos)
function comidasPorTempo(estado) {
  const comidas = ramoAtual(estado).comidas;
  return comidas !== undefined && comidas.poucoTempo !== undefined;
}

// Lista de perguntas, na ordem. "mostrar" diz se a pergunta vale para o momento.
const PERGUNTAS = [
  {
    chave: "companhia",
    titulo: "Vocês estão juntos ou separados?",
    mostrar: () => true,
    opcoes: () => [
      { valor: "juntos", texto: "Juntos", emoji: "💞" },
      { valor: "separados", texto: "Separados", emoji: "📱" },
    ],
  },
  {
    chave: "energia",
    titulo: "Como vocês estão?",
    mostrar: () => true,
    opcoes: () => [
      { valor: "cansados", texto: "Cansados", emoji: "😴" },
      { valor: "dispostos", texto: "Dispostos", emoji: "⚡" },
    ],
  },
  {
    chave: "tipo",
    titulo: "Que tipo de atividade?",
    mostrar: () => true,
    opcoes: (estado) =>
      tiposDisponiveis(estado).map((tipo) => ({
        valor: tipo,
        texto: TIPOS[tipo].texto,
        emoji: TIPOS[tipo].emoji,
      })),
  },
  {
    chave: "refeicao",
    titulo: "É almoço ou janta?",
    mostrar: (estado) => estado.tipo === "comidas",
    opcoes: () => [
      { valor: "almoco", texto: "Almoço", emoji: "☀️" },
      { valor: "janta", texto: "Janta", emoji: "🌙" },
    ],
  },
  {
    chave: "tempo",
    titulo: "Quanto tempo vocês têm?",
    mostrar: (estado) => estado.tipo === "comidas" && comidasPorTempo(estado),
    opcoes: () => [
      { valor: "poucoTempo", texto: "Pouco tempo", emoji: "⏱️" },
      { valor: "muitoTempo", texto: "Muito tempo", emoji: "🕰️" },
    ],
  },
];

// Devolve a próxima pergunta ainda sem resposta, ou null se já acabou
function proximaPergunta(estado) {
  return PERGUNTAS.find((p) => estado[p.chave] === undefined && p.mostrar(estado)) || null;
}

// Devolve as opções do resultado em grupos: [{ titulo, itens }]
// (grupos vazios são removidos)
function obterGrupos(estado) {
  const ramo = ramoAtual(estado);

  if (estado.tipo !== "comidas") {
    return [{ titulo: null, itens: ramo[estado.tipo] }];
  }

  let comidas = ramo.comidas;
  if (estado.tempo) comidas = comidas[estado.tempo];
  const refeicao = comidas[estado.refeicao];

  return Object.keys(GRUPOS_COMIDA)
    .map((chave) => ({ titulo: GRUPOS_COMIDA[chave], itens: refeicao[chave] || [] }))
    .filter((grupo) => grupo.itens.length > 0);
}

// Todas as opções válidas juntas (é daqui que o sorteio escolhe)
function todasOpcoes(estado) {
  return obterGrupos(estado).flatMap((grupo) => grupo.itens);
}

/* ---------- Tela ---------- */

let estado = {};
let historico = []; // chaves respondidas, para o botão "Voltar"
let ultimoSorteado = null;

const telaEl = typeof document !== "undefined" ? document.getElementById("tela") : null;

function criar(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

function desenhar() {
  telaEl.innerHTML = "";
  const pergunta = proximaPergunta(estado);
  if (pergunta) desenharPergunta(pergunta);
  else desenharResultado();
  window.scrollTo(0, 0);
}

function desenharResumo() {
  const partes = [];
  if (estado.companhia) partes.push(estado.companhia === "juntos" ? "Juntos" : "Separados");
  if (estado.energia) partes.push(estado.energia === "cansados" ? "Cansados" : "Dispostos");
  if (estado.tipo) partes.push(TIPOS[estado.tipo].texto);
  if (estado.refeicao) partes.push(estado.refeicao === "almoco" ? "Almoço" : "Janta");
  if (estado.tempo) partes.push(estado.tempo === "poucoTempo" ? "Pouco tempo" : "Muito tempo");
  if (partes.length === 0) return null;

  const resumo = criar("div", "resumo");
  partes.forEach((p) => resumo.appendChild(criar("span", "etiqueta", p)));
  return resumo;
}

function desenharPergunta(pergunta) {
  const resumo = desenharResumo();
  if (resumo) telaEl.appendChild(resumo);

  telaEl.appendChild(criar("h2", "pergunta", pergunta.titulo));

  const lista = criar("div", "opcoes");
  pergunta.opcoes(estado).forEach((opcao) => {
    const botao = criar("button", "opcao");
    botao.type = "button";
    botao.appendChild(criar("span", "opcao-emoji", opcao.emoji));
    botao.appendChild(criar("span", "opcao-texto", opcao.texto));
    botao.addEventListener("click", () => {
      estado[pergunta.chave] = opcao.valor;
      historico.push(pergunta.chave);
      desenhar();
    });
    lista.appendChild(botao);
  });
  telaEl.appendChild(lista);

  if (historico.length > 0) {
    const voltar = criar("button", "botao-secundario", "← Voltar");
    voltar.type = "button";
    voltar.addEventListener("click", voltarUmPasso);
    telaEl.appendChild(voltar);
  }
}

function desenharResultado() {
  telaEl.appendChild(desenharResumo());
  telaEl.appendChild(criar("h2", "pergunta", "Opções para vocês"));

  // Cartão onde aparece o item sorteado
  const cartao = criar("div", "sorteado");
  cartao.setAttribute("aria-live", "polite");
  cartao.appendChild(criar("span", "sorteado-rotulo", "Toque em Sortear ✨"));
  const nomeSorteado = criar("span", "sorteado-nome", "");
  cartao.appendChild(nomeSorteado);
  telaEl.appendChild(cartao);

  const botaoSortear = criar("button", "botao-sortear", "🎲 Sortear");
  botaoSortear.type = "button";
  telaEl.appendChild(botaoSortear);

  // Lista de opções (agrupada em Leves/Pesadas quando for comida)
  const itensEl = [];
  obterGrupos(estado).forEach((grupo) => {
    if (grupo.titulo) telaEl.appendChild(criar("h3", "grupo-titulo", grupo.titulo));
    const ul = criar("ul", "lista");
    grupo.itens.forEach((item) => {
      const li = criar("li", "item", item);
      itensEl.push(li);
      ul.appendChild(li);
    });
    telaEl.appendChild(ul);
  });

  botaoSortear.addEventListener("click", () => {
    const opcoes = todasOpcoes(estado);
    // Evita repetir o mesmo item duas vezes seguidas (se houver mais de um)
    let escolhido;
    do {
      escolhido = Math.floor(Math.random() * opcoes.length);
    } while (opcoes.length > 1 && opcoes[escolhido] === ultimoSorteado);
    ultimoSorteado = opcoes[escolhido];

    itensEl.forEach((li, i) => li.classList.toggle("destaque", i === escolhido));
    cartao.classList.remove("ativo");
    void cartao.offsetWidth; // reinicia a animação
    cartao.classList.add("ativo");
    cartao.firstChild.textContent = "Vocês vão de…";
    nomeSorteado.textContent = ultimoSorteado;
    botaoSortear.textContent = "🎲 Sortear de novo";
  });

  const acoes = criar("div", "acoes");
  const voltar = criar("button", "botao-secundario", "← Voltar");
  voltar.type = "button";
  voltar.addEventListener("click", voltarUmPasso);
  const inicio = criar("button", "botao-secundario", "⟲ Voltar ao início");
  inicio.type = "button";
  inicio.addEventListener("click", recomecar);
  acoes.appendChild(voltar);
  acoes.appendChild(inicio);
  telaEl.appendChild(acoes);
}

function voltarUmPasso() {
  const chave = historico.pop();
  if (chave) delete estado[chave];
  ultimoSorteado = null;
  desenhar();
}

function recomecar() {
  estado = {};
  historico = [];
  ultimoSorteado = null;
  desenhar();
}

if (telaEl) {
  document.getElementById("logo").addEventListener("click", recomecar);
  desenhar();
}
