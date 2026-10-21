import pokeball from '../assets/images/pokeball.svg'
import '../css/EmptyState.css'

function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state" role="status">
      <img src={pokeball} alt="" className="empty-state__icon" />
      <h2>{title}</h2>
      <p>{message}</p>
      {actionLabel && (
        <button type="button" className="empty-state__action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
