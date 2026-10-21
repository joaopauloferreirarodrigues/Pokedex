import { useEffect, useState } from 'react'

// Hook personalizado: funciona como useState, mas salva o valor no localStorage
// para que favoritos e tema continuem iguais ao recarregar a página.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Navegação privada ou armazenamento bloqueado: segue só em memória
    }
  }, [key, value])

  return [value, setValue]
}
