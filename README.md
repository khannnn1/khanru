# Khanru 💞

Um seletor de atividades para nós dois. O site faz algumas perguntas rápidas sobre o nosso momento, mostra as atividades que combinam e tem um botão **Sortear** para escolher uma delas por nós.

## Como funciona

1. **Juntos ou separados?**
2. **Cansados ou dispostos?**
3. **Que tipo de atividade?** — Jogos, Filmes/Séries, Comidas ou Faxina. Só aparecem os tipos que existem para aquela combinação (por exemplo: separados só tem Jogos e Filmes/Séries; Faxina só aparece quando estamos juntos e dispostos).
4. **Só para Comidas:** almoço ou janta? E, se estivermos dispostos, pouco ou muito tempo? (Quando estamos cansados, o tempo não importa, então essa pergunta não aparece.)
5. **Resultado:** a lista de opções e o botão **Sortear**. Também dá para sortear de novo, voltar uma pergunta ou voltar ao início.

## Como abrir no computador

Não precisa instalar nada. Basta dar **duplo clique no arquivo `index.html`** e ele abre no navegador.

## Arquivos

| Arquivo      | Para que serve                                     |
|--------------|----------------------------------------------------|
| `index.html` | A página do site                                   |
| `style.css`  | O visual (cores, tamanhos, botões)                 |
| `data.js`    | **As listas de atividades — é aqui que você edita** |
| `app.js`     | A lógica das perguntas e do sorteio                |

## Como editar as listas (`data.js`)

Abra o `data.js` em qualquer editor de texto (recomendo o [VS Code](https://code.visualstudio.com/)). As listas seguem a mesma ordem das perguntas:

```
juntos / separados  ->  cansados / dispostos  ->  tipo de atividade
```

Cada lista fica entre colchetes `[ ]`, com os itens entre aspas e separados por vírgula:

```js
jogos: ["Overcooked", "Fortnite"],
```

**Adicionar um item** — escreva o nome entre aspas, separado por vírgula:

```js
jogos: ["Overcooked", "Fortnite", "Minecraft"],
```

**Remover um item** — apague o nome, com as aspas e a vírgula:

```js
jogos: ["Overcooked"],
```

Dicas importantes:

- Um item só aparece no lugar onde está escrito. Para um jogo aparecer em "juntos + cansados" **e** em "juntos + dispostos", coloque ele nas duas listas.
- Não apague os colchetes `[ ]`, as chaves `{ }` nem os nomes antes dos dois-pontos (`jogos:`, `almoco:`, `leves:` ...).
- Nas comidas, cada refeição tem `leves` e `pesadas`. Uma lista vazia (`[]`) não aparece no site.
- Quando estiver **dispostos**, as comidas são divididas em `poucoTempo` e `muitoTempo`. Quando estiver **cansados**, vão direto para `almoco` e `janta`.
- Depois de salvar, é só recarregar a página no navegador (F5) para ver a mudança.
- Se o site ficar em branco depois de uma edição, provavelmente faltou uma vírgula, aspas ou colchete. Confira a última coisa que você mudou.
