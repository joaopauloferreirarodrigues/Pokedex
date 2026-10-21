import PokemonImage from './PokemonImage.jsx'
import { formatId, getPokemonById } from '../utils/pokemon.js'

const BADGE_SLOTS = 8 // as 8 insígnias de Kanto (alguns treinadores têm 9 nos dados)

// Agrupa IDs repetidos (ex.: Koga tem três Venonat) em { pokemon, count }
function groupTeam(pokemonIds) {
  const counts = new Map()
  pokemonIds.forEach((id) => counts.set(id, (counts.get(id) ?? 0) + 1))
  return [...counts.entries()]
    .map(([id, count]) => ({ pokemon: getPokemonById(id), count }))
    .filter((entry) => entry.pokemon)
}

function TrainerCard({ trainer, onSelectPokemon }) {
  const team = groupTeam(trainer.pokemonIds)

  return (
    <article className="trainer-card">
      <header className="trainer-card__head">
        <span className="trainer-card__avatar" aria-hidden="true">
          {trainer.name
            .split(/\s+/)
            .map((part) => part[0])
            .join('')
            .slice(0, 2)}
        </span>
        <div>
          <h3 className="trainer-card__name">{trainer.name}</h3>
          <p className="trainer-card__meta">
            {trainer.pokemonIds.length} Pokémon na equipe
          </p>
        </div>
      </header>

      <div className="trainer-card__badges" aria-label={`${trainer.badges} insígnias`}>
        <span className="trainer-card__badges-label">Insígnias</span>
        <div className="trainer-card__badges-row">
          {Array.from({ length: BADGE_SLOTS }, (_, i) => (
            <span key={i} className={`trainer-card__badge ${i < trainer.badges ? 'is-earned' : ''}`} />
          ))}
          <strong className="trainer-card__badges-count">{trainer.badges}</strong>
        </div>
      </div>

      <ul className="trainer-card__team">
        {team.map(({ pokemon, count }) => (
          <li key={pokemon.id}>
            <button
              type="button"
              className="trainer-card__mon"
              onClick={() => onSelectPokemon(pokemon)}
              title={`${formatId(pokemon.id)} ${pokemon.name}`}
            >
              <PokemonImage pokemon={pokemon} className="trainer-card__mon-img" />
              <span className="trainer-card__mon-name">{pokemon.name}</span>
              {count > 1 && <span className="trainer-card__mon-count">×{count}</span>}
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default TrainerCard
