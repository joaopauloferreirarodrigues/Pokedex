import { TYPE_LABELS_PT, typeColor } from '../utils/pokemon.js'
import '../css/TypeBadge.css'
function TypeBadge({ type, as = 'span', active = false, dimmed = false, onClick }) {
  const Tag = as
  const className = ['type-badge', active && 'is-active', dimmed && 'is-dimmed']
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      className={className}
      style={{ '--type-color': typeColor(type) }}
      {...(as === 'button' ? { type: 'button', onClick, 'aria-pressed': active } : {})}
    >
      {TYPE_LABELS_PT[type] ?? type}
    </Tag>
  )
}

export default TypeBadge
