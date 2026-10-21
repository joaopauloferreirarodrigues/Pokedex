import { useMemo, useState } from 'react'
import TrainerCard from './TrainerCard.jsx'
import EmptyState from './EmptyState.jsx'
import { allTrainers } from '../utils/pokemon.js'
import '../css/Trainers.css'

function TrainerList({ onSelectPokemon }) {
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState('badges')

  const trainers = useMemo(() => {
    const filtered = allTrainers.filter((t) =>
      t.name.toLowerCase().includes(query.trim().toLowerCase()),
    )
    return [...filtered].sort((a, b) =>
      order === 'badges' ? b.badges - a.badges || a.name.localeCompare(b.name) : a.name.localeCompare(b.name),
    )
  }, [query, order])

  return (
    <section aria-labelledby="trainers-title">
      <div className="trainers__top">
        <div>
          <h2 id="trainers-title" className="trainers__title">Treinadores</h2>
          <p className="trainers__subtitle">
            Clique em um Pokémon da equipe para ver os detalhes dele.
          </p>
        </div>
        <div className="trainers__controls">
          <input
            type="search"
            className="trainers__search"
            placeholder="Buscar treinador..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Buscar treinador pelo nome"
          />
          <select
            value={order}
            onChange={(event) => setOrder(event.target.value)}
            aria-label="Ordenar treinadores"
          >
            <option value="badges">Mais insígnias</option>
            <option value="name">Nome (A–Z)</option>
          </select>
        </div>
      </div>

      {trainers.length === 0 ? (
        <EmptyState title="Nenhum treinador encontrado" message="Confira o nome digitado." />
      ) : (
        <ul className="trainers__grid">
          {trainers.map((trainer) => (
            <li key={trainer.id}>
              <TrainerCard trainer={trainer} onSelectPokemon={onSelectPokemon} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default TrainerList
