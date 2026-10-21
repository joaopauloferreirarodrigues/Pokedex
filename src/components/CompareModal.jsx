import Modal from './Modal.jsx'
import PokemonImage from './PokemonImage.jsx'
import TypeBadge from './TypeBadge.jsx'
import StatBar from './StatBar.jsx'
import { STATS, formatId, totalStats, typeColor } from '../utils/pokemon.js'
import '../css/Compare.css'

function CompareModal({ pokemon, onClose }) {
  const [a, b] = pokemon
  const totalA = totalStats(a)
  const totalB = totalStats(b)

  // Conta em quantos atributos cada um vence
  const winsA = STATS.filter((s) => a.stats[s.key] > b.stats[s.key]).length
  const winsB = STATS.filter((s) => b.stats[s.key] > a.stats[s.key]).length

  return (
    <Modal title={`Comparação: ${a.name} e ${b.name}`} onClose={onClose} wide>
      <div className="compare">
        <h2 className="compare__title">Comparação</h2>

        <div className="compare__grid">
          {[a, b].map((p, index) => {
            const other = index === 0 ? b : a
            const color = typeColor(p.types[0].name)
            const wins = index === 0 ? winsA : winsB
            const total = index === 0 ? totalA : totalB
            const otherTotal = index === 0 ? totalB : totalA

            return (
              <section key={p.id} className="compare__col" style={{ '--accent': color }}>
                <div className="compare__head">
                  <PokemonImage pokemon={p} className="compare__img" eager />
                  <div>
                    <span className="compare__number">{formatId(p.id)}</span>
                    <h3>{p.name}</h3>
                    <div className="compare__types">
                      {p.types.map((t) => (
                        <TypeBadge key={t.id} type={t.name} />
                      ))}
                    </div>
                  </div>
                </div>

                {STATS.map((stat) => (
                  <StatBar
                    key={stat.key}
                    label={stat.label}
                    value={p.stats[stat.key]}
                    color={color}
                    highlight={p.stats[stat.key] > other.stats[stat.key]}
                  />
                ))}

                <p className={`compare__total ${total > otherTotal ? 'is-winner' : ''}`}>
                  Total <strong>{total}</strong> · vence em {wins} de {STATS.length}
                </p>
              </section>
            )
          })}
        </div>

        <p className="compare__verdict">
          {totalA === totalB
            ? 'Empate no total de atributos!'
            : `${totalA > totalB ? a.name : b.name} tem o maior total de atributos (+${Math.abs(totalA - totalB)}).`}
        </p>
      </div>
    </Modal>
  )
}

export default CompareModal
