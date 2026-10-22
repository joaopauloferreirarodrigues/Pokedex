import PokemonImage from './PokemonImage.jsx'
import '../css/Compare.css'
function CompareBar({ pokemon, onRemove, onCompare, onClear }) {
  const ready = pokemon.length === 2

  return (
    <aside className="compare-bar" aria-label="Comparação">
      <div className="compare-bar__slots">
        {[0, 1].map((slot) => {
          const p = pokemon[slot]
          return p ? (
            <button
              key={p.id}
              type="button"
              className="compare-bar__slot"
              onClick={() => onRemove(p.id)}
              title={`Remover ${p.name}`}
            >
              <PokemonImage pokemon={p} className="compare-bar__img" />
              <span>{p.name}</span>
              <span aria-hidden="true">×</span>
            </button>
          ) : (
            <span key={`empty-${slot}`} className="compare-bar__slot is-empty">
              Escolha outro ⚔
            </span>
          )
        })}
      </div>
      <div className="compare-bar__actions">
        <button type="button" className="compare-bar__ghost" onClick={onClear}>
          Limpar
        </button>
        <button type="button" className="compare-bar__go" onClick={onCompare} disabled={!ready}>
          Comparar
        </button>
      </div>
    </aside>
  )
}

export default CompareBar
