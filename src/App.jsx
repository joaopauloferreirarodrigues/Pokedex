import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import Filters from './components/Filters.jsx'
import PokemonList from './components/PokemonList.jsx'
import PokemonDetails from './components/PokemonDetails.jsx'
import CompareBar from './components/CompareBar.jsx'
import CompareModal from './components/CompareModal.jsx'
import TrainerList from './components/TrainerList.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { allPokemon, matchesSearch, sortPokemon } from './utils/pokemon.js'
import './css/App.css'

const prefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches

function App() {
  // Navegação entre as duas áreas da aplicação
  const [view, setView] = useState('pokedex')

  // Estados de pesquisa, filtro e ordenação
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('id')
  const [sortDirection, setSortDirection] = useState('asc')
  const [onlyFavorites, setOnlyFavorites] = useState(false)

  // Pokémon aberto no modal de detalhes e Pokémon escolhidos para comparação
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [compareIds, setCompareIds] = useState([])
  const [isComparing, setIsComparing] = useState(false)

  // Estados persistidos no navegador
  const [favorites, setFavorites] = useLocalStorage('pokedex:favorites', [])
  const [theme, setTheme] = useLocalStorage('pokedex:theme', prefersDark() ? 'dark' : 'light')

  // Aplica o tema no <html> sempre que ele muda
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Estado derivado: a lista exibida é calculada a partir dos filtros,
  // sem precisar guardar uma cópia filtrada em outro useState.
  const visiblePokemon = useMemo(() => {
    const filtered = allPokemon.filter(
      (p) =>
        matchesSearch(p, search) &&
        (selectedType === 'all' || p.types.some((t) => t.name === selectedType)) &&
        (!onlyFavorites || favorites.includes(p.id)),
    )
    return sortPokemon(filtered, sortBy, sortDirection)
  }, [search, selectedType, onlyFavorites, favorites, sortBy, sortDirection])

  const comparePokemon = compareIds.map((id) => allPokemon.find((p) => p.id === id))

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favId) => favId !== id) : [...current, id],
    )
  }

  function toggleCompare(id) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((cid) => cid !== id)
      // No máximo 2: o mais antigo sai quando um terceiro é escolhido
      return [...current, id].slice(-2)
    })
  }

  function showRandomPokemon() {
    const source = visiblePokemon.length > 0 ? visiblePokemon : allPokemon
    const random = source[Math.floor(Math.random() * source.length)]
    setSelectedPokemon(random)
  }

  function clearFilters() {
    setSearch('')
    setSelectedType('all')
    setOnlyFavorites(false)
  }

  function changeView(nextView) {
    setView(nextView)
    window.scrollTo({ top: 0 })
  }

  function openFromTrainer(pokemon) {
    setSelectedPokemon(pokemon)
  }

  return (
    <div className="app">
      <Header
        view={view}
        onChangeView={changeView}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />

      <main className="app__main">
        {view === 'pokedex' ? (
          <>
            <section className="toolbar" aria-label="Pesquisa e filtros">
              <SearchBar value={search} onChange={setSearch} />
              <Filters
                selectedType={selectedType}
                onSelectType={setSelectedType}
                sortBy={sortBy}
                onSortBy={setSortBy}
                sortDirection={sortDirection}
                onToggleDirection={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                onlyFavorites={onlyFavorites}
                onToggleFavorites={() => setOnlyFavorites(!onlyFavorites)}
                favoritesCount={favorites.length}
                onRandom={showRandomPokemon}
              />
            </section>

            <p className="results-count" aria-live="polite">
              {visiblePokemon.length === allPokemon.length
                ? `${allPokemon.length} Pokémon registrados`
                : `${visiblePokemon.length} de ${allPokemon.length} Pokémon`}
            </p>

            <PokemonList
              pokemon={visiblePokemon}
              favorites={favorites}
              compareIds={compareIds}
              onSelect={setSelectedPokemon}
              onToggleFavorite={toggleFavorite}
              onToggleCompare={toggleCompare}
              onClearFilters={clearFilters}
            />
          </>
        ) : (
          <TrainerList onSelectPokemon={openFromTrainer} />
        )}
      </main>

      <footer className="app__footer">
        Dados: <code>src/data/pokedex-data.json</code> · Imagens: repositório de sprites da PokéAPI
      </footer>

      {view === 'pokedex' && compareIds.length > 0 && !isComparing && (
        <CompareBar
          pokemon={comparePokemon}
          onRemove={toggleCompare}
          onCompare={() => setIsComparing(true)}
          onClear={() => setCompareIds([])}
        />
      )}

      {selectedPokemon && (
        <PokemonDetails
          key={selectedPokemon.id}
          pokemon={selectedPokemon}
          isFavorite={favorites.includes(selectedPokemon.id)}
          onToggleFavorite={() => toggleFavorite(selectedPokemon.id)}
          onClose={() => setSelectedPokemon(null)}
        />
      )}

      {isComparing && comparePokemon.length === 2 && (
        <CompareModal pokemon={comparePokemon} onClose={() => setIsComparing(false)} />
      )}
    </div>
  )
}

export default App
