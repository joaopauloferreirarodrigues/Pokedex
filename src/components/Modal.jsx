import { useEffect, useRef } from 'react'
import '../css/Modal.css'

// Janela modal reutilizável: fecha com ESC, clique fora ou botão ×,
// e trava a rolagem da página enquanto está aberta.
function Modal({ title, onClose, children, wide = false }) {
  const dialogRef = useRef(null)
  // Guarda sempre a versão mais recente de onClose sem reexecutar o efeito
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <div className="modal" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className={`modal__dialog ${wide ? 'modal__dialog--wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
