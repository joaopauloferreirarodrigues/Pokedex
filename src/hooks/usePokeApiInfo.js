import { useEffect, useState } from 'react'

const checkResponse = (response) => {
  if (!response.ok) throw new Error(`PokéAPI respondeu ${response.status}`)
  return response.json()
}
export function usePokeApiInfo(id) {
  const [state, setState] = useState({ status: 'loading', info: null })

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { signal }).then(checkResponse),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, { signal }).then(checkResponse),
    ])
      .then(([pokemon, species]) => {
        const entry = species.flavor_text_entries.find((e) => e.language.name === 'en')
        const genus = species.genera.find((g) => g.language.name === 'en')?.genus

        setState({
          status: 'success',
          info: {
            height: pokemon.height / 10,
            weight: pokemon.weight / 10,
            genus,
            description: entry?.flavor_text.replace(/[\f\n\r]+/g, ' '),
          },
        })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', info: null })
      })
    return () => controller.abort()
  }, [id])

  return state
}
