import PokemonCard from './PokemonCard.jsx'
import EmptyState from './EmptyState.jsx'
import '../css/PokemonList.css'

function PokemonList({
  pokemon,
  favorites,
  compareIds,
  onSelect,
  onToggleFavorite,
  onToggleCompare,
  onClearFilters,
}) {
  if (pokemon.length === 0) {
    return (
      <EmptyState
        title="Nenhum Pokémon encontrado"
        message="Tente outro nome ou número, ou remova os filtros aplicados."
        actionLabel="Limpar filtros"
        onAction={onClearFilters}
      />
    )
  }

  return (
    <ul className="pokemon-list">
      {pokemon.map((p) => (
        <li key={p.id}>
          <PokemonCard
            pokemon={p}
            isFavorite={favorites.includes(p.id)}
            isComparing={compareIds.includes(p.id)}
            onSelect={() => onSelect(p)}
            onToggleFavorite={() => onToggleFavorite(p.id)}
            onToggleCompare={() => onToggleCompare(p.id)}
          />
        </li>
      ))}
    </ul>
  )
}

export default PokemonList
