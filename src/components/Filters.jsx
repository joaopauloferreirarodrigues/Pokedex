import TypeBadge from './TypeBadge.jsx'
import { SORT_OPTIONS, filterTypes } from '../utils/pokemon.js'
import '../css/Filters.css'

function Filters({
  selectedType,
  onSelectType,
  sortBy,
  onSortBy,
  sortDirection,
  onToggleDirection,
  onlyFavorites,
  onToggleFavorites,
  favoritesCount,
  onRandom,
}) {
  return (
    <div className="filters">
      <div className="filters__types" role="group" aria-label="Filtrar por tipo">
        <button
          type="button"
          className={`filters__all ${selectedType === 'all' ? 'is-active' : ''}`}
          aria-pressed={selectedType === 'all'}
          onClick={() => onSelectType('all')}
        >
          Todos
        </button>
        {filterTypes.map((type) => (
          <TypeBadge
            key={type.id}
            type={type.name}
            as="button"
            active={selectedType === type.name}
            dimmed={selectedType !== 'all' && selectedType !== type.name}
            onClick={() => onSelectType(selectedType === type.name ? 'all' : type.name)}
          />
        ))}
      </div>

      <div className="filters__row">
        <label className="filters__sort">
          <span>Ordenar por</span>
          <select value={sortBy} onChange={(event) => onSortBy(event.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="filters__btn"
          onClick={onToggleDirection}
          aria-label={sortDirection === 'asc' ? 'Ordem crescente' : 'Ordem decrescente'}
          title={sortDirection === 'asc' ? 'Crescente' : 'Decrescente'}
        >
          {sortDirection === 'asc' ? '↑ Cresc.' : '↓ Decresc.'}
        </button>

        <button
          type="button"
          className={`filters__btn ${onlyFavorites ? 'is-active' : ''}`}
          aria-pressed={onlyFavorites}
          onClick={onToggleFavorites}
        >
          ★ Favoritos <span className="filters__count">{favoritesCount}</span>
        </button>

        <button type="button" className="filters__btn filters__btn--accent" onClick={onRandom}>
          🎲 Aleatório
        </button>
      </div>
    </div>
  )
}

export default Filters
