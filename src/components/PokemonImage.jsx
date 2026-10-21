import { useState } from 'react'
import { pokemonImageUrl } from '../utils/pokemon.js'
import pokeballFallback from '../assets/images/pokeball.svg'

// Mostra a arte oficial do Pokémon. Se a imagem externa não carregar
// (sem internet, por exemplo), cai para uma Pokébola local.
function PokemonImage({ pokemon, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)

  return (
    <img
      className={`${className} ${failed ? 'is-fallback' : ''}`}
      src={failed ? pokeballFallback : pokemonImageUrl(pokemon.id)}
      alt={pokemon.name}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
    />
  )
}

export default PokemonImage
