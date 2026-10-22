import data from '../data/pokedex-data.json'
export const allPokemon = data.pokemon
export const allTrainers = data.trainers
const usedTypeIds = new Set(allPokemon.flatMap((p) => p.types.map((t) => t.id)))
export const filterTypes = data.types.filter((t) => usedTypeIds.has(t.id))
const pokemonById = new Map(allPokemon.map((p) => [p.id, p]))
export const getPokemonById = (id) => pokemonById.get(id)

export const STATS = [
  { key: 'hp', label: 'HP', short: 'HP' },
  { key: 'attack', label: 'Ataque', short: 'ATK' },
  { key: 'defense', label: 'Defesa', short: 'DEF' },
  { key: 'specialAttack', label: 'Ataque Especial', short: 'SP.ATK' },
  { key: 'specialDefense', label: 'Defesa Especial', short: 'SP.DEF' },
  { key: 'speed', label: 'Velocidade', short: 'VEL' },
]
export const MAX_STAT = 255

export const totalStats = (pokemon) =>
  Object.values(pokemon.stats).reduce((sum, value) => sum + value, 0)

export const formatId = (id) => `#${String(id).padStart(3, '0')}`
export const TYPE_COLORS = {
  Normal: '#A8A77A',
  Fire: '#EE8130',
  Water: '#6390F0',
  Grass: '#7AC74C',
  Electric: '#F7D02C',
  Ice: '#96D9D6',
  Fighting: '#C22E28',
  Poison: '#A33EA1',
  Ground: '#E2BF65',
  Flying: '#A98FF3',
  Psychic: '#F95587',
  Bug: '#A6B91A',
  Rock: '#B6A136',
  Ghost: '#735797',
  Dark: '#705746',
  Dragon: '#6F35FC',
  Steel: '#B7B7CE',
  Typeless: '#68A090',
}

export const TYPE_LABELS_PT = {
  Normal: 'Normal',
  Fire: 'Fogo',
  Water: 'Água',
  Grass: 'Planta',
  Electric: 'Elétrico',
  Ice: 'Gelo',
  Fighting: 'Lutador',
  Poison: 'Venenoso',
  Ground: 'Terra',
  Flying: 'Voador',
  Psychic: 'Psíquico',
  Bug: 'Inseto',
  Rock: 'Pedra',
  Ghost: 'Fantasma',
  Dark: 'Sombrio',
  Dragon: 'Dragão',
  Steel: 'Aço',
  Typeless: 'Sem tipo',
}

export const typeColor = (typeName) => TYPE_COLORS[typeName] ?? '#888'
export const pokemonImageUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
export function matchesSearch(pokemon, rawQuery) {
  const query = rawQuery.trim().toLowerCase()
  if (!query) return true

  const numeric = query.replace(/^#/, '')
  if (/^\d+$/.test(numeric)) {
    return String(pokemon.id).startsWith(String(Number(numeric))) && Number(numeric) > 0
  }
  return pokemon.name.toLowerCase().includes(query)
}

export const SORT_OPTIONS = [
  { value: 'id', label: 'Número' },
  { value: 'name', label: 'Nome' },
  { value: 'total', label: 'Total de atributos' },
  ...STATS.map((s) => ({ value: s.key, label: s.label })),
]

export function sortPokemon(list, sortBy, direction) {
  const factor = direction === 'asc' ? 1 : -1
  const valueOf = (p) => {
    if (sortBy === 'id') return p.id
    if (sortBy === 'name') return p.name
    if (sortBy === 'total') return totalStats(p)
    return p.stats[sortBy]
  }
  return [...list].sort((a, b) => {
    const va = valueOf(a)
    const vb = valueOf(b)
    const result = typeof va === 'string' ? va.localeCompare(vb) : va - vb
    return result * factor || a.id - b.id
  })
}
