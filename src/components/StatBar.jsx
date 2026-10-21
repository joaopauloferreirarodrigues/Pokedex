import { MAX_STAT } from '../utils/pokemon.js'
import '../css/StatBar.css'

// Barra de progresso de um atributo. "highlight" marca o vencedor na comparação.
function StatBar({ label, value, color, highlight = false }) {
  const percent = Math.min(100, Math.round((value / MAX_STAT) * 100))

  return (
    <div className={`stat-bar ${highlight ? 'is-highlight' : ''}`}>
      <span className="stat-bar__label">{label}</span>
      <span className="stat-bar__value">{value}</span>
      <div
        className="stat-bar__track"
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={MAX_STAT}
        aria-valuenow={value}
      >
        <div className="stat-bar__fill" style={{ width: `${percent}%`, '--bar-color': color }} />
      </div>
    </div>
  )
}

export default StatBar
