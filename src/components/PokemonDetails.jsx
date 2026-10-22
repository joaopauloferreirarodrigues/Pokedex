import Modal from './Modal.jsx'
import TypeBadge from './TypeBadge.jsx'
import StatBar from './StatBar.jsx'
import PokemonImage from './PokemonImage.jsx'
import { usePokeApiInfo } from '../hooks/usePokeApiInfo.js'
import { STATS, allTrainers, formatId, totalStats, typeColor } from '../utils/pokemon.js'
import '../css/PokemonDetails.css'

function PokemonDetails({ pokemon, isFavorite, onToggleFavorite, onClose }) {
  const { status, info } = usePokeApiInfo(pokemon.id)
  const [primaryType, secondaryType] = pokemon.types.map((t) => t.name)
  const accent = typeColor(primaryType)
  const owners = allTrainers.filter((trainer) => trainer.pokemonIds.includes(pokemon.id))

  return (
    <Modal title={`Detalhes de ${pokemon.name}`} onClose={onClose}>
      <div
        className="details"
        style={{ '--accent': accent, '--accent-2': typeColor(secondaryType ?? primaryType) }}
      >
        <div className="details__hero">
          <span className="details__number">{formatId(pokemon.id)}</span>
          <PokemonImage pokemon={pokemon} className="details__img" eager />
        </div>

        <div className="details__content">
          <div className="details__heading">
            <div>
              <h2 className="details__name">{pokemon.name}</h2>
              {info?.genus && <p className="details__genus">{info.genus}</p>}
            </div>
            <button
              type="button"
              className={`details__fav ${isFavorite ? 'is-on' : ''}`}
              onClick={onToggleFavorite}
              aria-pressed={isFavorite}
            >
              {isFavorite ? '★ Favorito' : '☆ Favoritar'}
            </button>
          </div>

          <div className="details__types">
            {pokemon.types.map((type) => (
              <TypeBadge key={type.id} type={type.name} />
            ))}
          </div>

          <section className="details__section">
            <h3>Atributos base</h3>
            {STATS.map((stat) => (
              <StatBar key={stat.key} label={stat.label} value={pokemon.stats[stat.key]} color={accent} />
            ))}
            <p className="details__total">
              Total <strong>{totalStats(pokemon)}</strong>
            </p>
          </section>

          <section className="details__section">
            <h3>Informações extras</h3>
            {status === 'loading' && <p className="details__muted">Carregando dados da PokéAPI…</p>}
            {status === 'error' && (
              <p className="details__muted">
                Não foi possível consultar a PokéAPI agora. Os dados principais acima vêm do arquivo local.
              </p>
            )}
            {status === 'success' && (
              <>
                <dl className="details__facts">
                  <div>
                    <dt>Altura</dt>
                    <dd>{info.height.toLocaleString('pt-BR')} m</dd>
                  </div>
                  <div>
                    <dt>Peso</dt>
                    <dd>{info.weight.toLocaleString('pt-BR')} kg</dd>
                  </div>
                </dl>
                {info.description && (
                  <p className="details__description" lang="en">
                    “{info.description}”
                  </p>
                )}
              </>
            )}
          </section>

          <section className="details__section">
            <h3>Treinadores com este Pokémon</h3>
            {owners.length > 0 ? (
              <ul className="details__owners">
                {owners.map((trainer) => (
                  <li key={trainer.id}>{trainer.name}</li>
                ))}
              </ul>
            ) : (
              <p className="details__muted">Nenhum treinador dos dados possui este Pokémon.</p>
            )}
          </section>
        </div>
      </div>
    </Modal>
  )
}

export default PokemonDetails
