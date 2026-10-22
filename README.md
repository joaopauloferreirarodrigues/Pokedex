# 🎮 Pokédex — React + Vite

Atividade 03 da disciplina **Desenvolvimento e Integração de Aplicações Web** (PUC Minas).

Pokédex interativa com os 151 Pokémon da 1ª geração: pesquisa por nome ou número, filtro por tipo, ordenação por atributo, detalhes em modal com barras de atributos, comparação entre dois Pokémon, favoritos, Pokémon aleatório, área de treinadores e tema claro/escuro.

- Nome do integrante 1 — [João Paulo Ferreira Rodrigues](https://github.com/joaopauloferreirarodrigues)
- Nome do integrante 2 — [Fernando Rodrigues](https://github.com/fernandortec)

Desenvolvido em **Pair Programming**.

**Requisitos obrigatórios**

- Lista com todos os Pokémon do arquivo de dados, cada card mostrando número, nome, tipo(s), HP, Ataque, Defesa, Ataque Especial, Defesa Especial e Velocidade.
- Pesquisa em tempo real por **nome** (parcial, ex.: `Bulba`) ou **número** (ex.: `25`, `#025`).
- Filtro por **tipo** usando os tipos presentes no `pokedex-data.json`.
- **Detalhes** do Pokémon em modal, com barras de progresso para cada atributo e o total.
- Área de **Treinadores** com nome, quantidade de insígnias e equipe (clicar em um Pokémon da equipe abre os detalhes dele).
- Mensagem e botão "Limpar filtros" quando **nenhum Pokémon é encontrado**.
- Layout **responsivo** (desktop, tablet e smartphone) e identidade visual própria inspirada no aparelho da Pokédex.

**Desafios opcionais implementados**

- ⭐ **Favoritos** (salvos no navegador com `localStorage`) e filtro "só favoritos".
- ⚔️ **Comparação** de dois Pokémon atributo por atributo, indicando quem vence em cada um.
- 📊 **Ordenação** por número, nome, total ou qualquer atributo, em ordem crescente ou decrescente.
- 🎲 **Pokémon aleatório** (sorteia entre os que estão visíveis com os filtros atuais).
- 🌙 **Tema escuro** (respeita a preferência do sistema na primeira visita e fica salvo).
- 🌐 **API externa**: o modal de detalhes busca altura, peso, categoria e descrição na PokéAPI.

Pré-requisito: [Node.js](https://nodejs.org/) 20.19+ ou 22.12+ (exigência do Vite 8).

```bash
npm install
npm run dev
```

Depois, abra no navegador o endereço mostrado no terminal (por padrão **http://localhost:5173**).

Outros comandos:

```bash
npm run build
npm run preview
npm run lint
```

Os dados da aplicação estão em **`src/data/pokedex-data.json`** (arquivo fornecido na atividade). Ele contém:

- `pokemon`: 151 Pokémon com `id`, `name`, `stats` (hp, attack, defense, specialAttack, specialDefense, speed) e `types`;
- `types`: lista de tipos;
- `trainers`: treinadores com `badges` (insígnias) e `pokemonIds` (relação treinador → Pokémon).

O JSON é importado diretamente pelo Vite em `src/utils/pokemon.js`. Não há banco de dados.

- **Imagens dos Pokémon:** arte oficial do repositório público de sprites da PokéAPI —
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png`.
  Se a imagem não carregar, o componente `PokemonImage` mostra uma Pokébola local (`src/assets/images/pokeball.svg`).
- **Informações extras no modal:** [PokéAPI](https://pokeapi.co/) — endpoints `/api/v2/pokemon/{id}` (altura e peso) e `/api/v2/pokemon-species/{id}` (categoria e descrição em inglês).
- **Fontes tipográficas:** Space Grotesk e JetBrains Mono, via Google Fonts.

> A aplicação continua funcionando sem internet com os dados do `pokedex-data.json`: a lista, a pesquisa, os filtros, os detalhes, os treinadores e a comparação usam só o arquivo local. Sem conexão, as imagens viram Pokébolas e o modal avisa que a PokéAPI não respondeu.

```
pokedex-react/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/images/pokeball.svg
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Filters.jsx
│   │   ├── TypeBadge.jsx
│   │   ├── PokemonList.jsx
│   │   ├── PokemonCard.jsx
│   │   ├── PokemonImage.jsx
│   │   ├── PokemonDetails.jsx
│   │   ├── StatBar.jsx
│   │   ├── Modal.jsx
│   │   ├── CompareBar.jsx
│   │   ├── CompareModal.jsx
│   │   ├── TrainerList.jsx
│   │   ├── TrainerCard.jsx
│   │   └── EmptyState.jsx
│   ├── css/
│   ├── data/pokedex-data.json
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── usePokeApiInfo.js
│   ├── utils/pokemon.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

| Conceito | Onde |
| --- | --- |
| Componentes funcionais e componentização | todos os arquivos de `src/components/` |
| Props | `App` → `PokemonList` → `PokemonCard`, `Filters`, `PokemonDetails`, etc. |
| `useState` | `App.jsx` (pesquisa, tipo, ordenação, modal, comparação, aba), `TrainerList.jsx` |
| Renderização de listas com `map()` | `PokemonList`, `Filters`, `TrainerList`, `TrainerCard`, `PokemonDetails` |
| Eventos | `onChange` na pesquisa e nos selects, `onClick` em cards, filtros e botões, `keydown` (ESC) no modal |
| Filtragem de dados | `App.jsx` (`visiblePokemon`) e `utils/pokemon.js` (`matchesSearch`) |
| Estado derivado | a lista exibida é calculada com `useMemo` a partir dos filtros, sem duplicar estado |
| `useEffect` | tema no `<html>`, `localStorage`, PokéAPI e listener de teclado do modal |
| Hooks personalizados | `useLocalStorage` e `usePokeApiInfo` |
| Reutilização de componentes | `TypeBadge`, `StatBar`, `Modal`, `PokemonImage`, `EmptyState` |

Somente as do template oficial do Vite (`react`, `react-dom`, `vite`, `@vitejs/plugin-react` e `oxlint`), todas registradas no `package.json`. Nenhuma biblioteca extra foi necessária: ícones, barras, animações e tema foram feitos com CSS puro.



