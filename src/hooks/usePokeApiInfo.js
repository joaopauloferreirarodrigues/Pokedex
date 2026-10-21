import { useEffect, useState } from 'react'

const checkResponse = (response) => {
  if (!response.ok) throw new Error(`PokéAPI respondeu ${response.status}`)
  return response.json()
}

// Busca informações complementares (altura, peso, categoria e descrição) na PokéAPI.
// É opcional: se a API falhar, o modal continua funcionando só com o JSON local.
// Obs.: o componente que usa este hook recebe key={id}, então ele é recriado
// (com estado "loading" novo) a cada Pokémon aberto.
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
            height: pokemon.height / 10, // decímetros -> metros
            weight: pokemon.weight / 10, // hectogramas -> kg
            genus,
            description: entry?.flavor_text.replace(/[\f\n\r]+/g, ' '),
          },
        })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', info: null })
      })

    // Cancela a requisição se o modal fechar antes de a resposta chegar
    return () => controller.abort()
  }, [id])

  return state
}
