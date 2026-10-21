import TypeBadge from './TypeBadge.jsx'
import PokemonImage from './PokemonImage.jsx'
import { STATS, formatId, totalStats, typeColor } from '../utils/pokemon.js'
import '../css/PokemonCard.css'

function PokemonCard({ pokemon, isFavorite, isComparing, onSelect, onToggleFavorite, onToggleCompare }) {
  const [primaryType, secondaryType] = pokemon.types.map((t) => t.name)
  const accent = typeColor(primaryType)
  const accent2 = typeColor(secondaryType ?? primaryType)

  return (
    <article
      className={`pokemon-card ${isComparing ? 'is-comparing' : ''}`}
      style={{ '--accent': accent, '--accent-2': accent2 }}
    >
      <button
        type="button"
        className="pokemon-card__main"
        onClick={onSelect}
        aria-label={`Ver detalhes de ${pokemon.name}`}
      >
        <div className="pokemon-card__art">
          <span className="pokemon-card__number">{formatId(pokemon.id)}</span>
          <PokemonImage pokemon={pokemon} className="pokemon-card__img" />
        </div>

        <div className="pokemon-card__body">
          <h2 className="pokemon-card__name">{pokemon.name}</h2>
          <div className="pokemon-card__types">
            {pokemon.types.map((type) => (
              <TypeBadge key={type.id} type={type.name} />
            ))}
          </div>

          <dl className="pokemon-card__stats">
            {STATS.map((stat) => (
              <div key={stat.key} className="pokemon-card__stat">
                <dt>{stat.short}</dt>
                <dd>{pokemon.stats[stat.key]}</dd>
              </div>
            ))}
          </dl>
          <p className="pokemon-card__total">
            Total <strong>{totalStats(pokemon)}</strong>
          </p>
        </div>
      </button>

      <div className="pokemon-card__actions">
        <button
          type="button"
          className={`pokemon-card__icon ${isFavorite ? 'is-on' : ''}`}
          onClick={onToggleFavorite}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Remover ${pokemon.name} dos favoritos` : `Favoritar ${pokemon.name}`}
          title={isFavorite ? 'Remover dos favoritos' : 'Favoritar'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
        <button
          type="button"
          className={`pokemon-card__icon pokemon-card__icon--compare ${isComparing ? 'is-on' : ''}`}
          onClick={onToggleCompare}
          aria-pressed={isComparing}
          title={isComparing ? 'Remover da comparação' : 'Comparar'}
        >
          ⚔
        </button>
      </div>
    </article>
  )
}

export default PokemonCard
