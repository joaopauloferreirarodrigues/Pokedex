import '../css/SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <label htmlFor="search-input" className="visually-hidden">
        Pesquisar Pokémon por nome ou número
      </label>
      <svg className="search__icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        id="search-input"
        type="search"
        className="search__input"
        placeholder="Pesquisar Pokémon... (nome ou nº, ex.: Bulba, 25)"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
      {value && (
        <button
          type="button"
          className="search__clear"
          onClick={() => onChange('')}
          aria-label="Limpar pesquisa"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default SearchBar
