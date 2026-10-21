import '../css/Header.css'

function Header({ view, onChangeView, theme, onToggleTheme }) {
  const tabs = [
    { id: 'pokedex', label: 'Pokédex' },
    { id: 'trainers', label: 'Treinadores' },
  ]

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <span className="header__lens" aria-hidden="true" />
          <span className="header__leds" aria-hidden="true">
            <i /> <i /> <i />
          </span>
          <h1 className="header__title">Pokédex</h1>
        </div>

        <nav className="header__nav" aria-label="Seções">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`header__tab ${view === tab.id ? 'is-active' : ''}`}
              aria-current={view === tab.id ? 'page' : undefined}
              onClick={() => onChangeView(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="header__theme"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </header>
  )
}

export default Header
