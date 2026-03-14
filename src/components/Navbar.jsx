import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  // Close search when navigating
  useEffect(() => {
    setSearchOpen(false)
    setQuery('')
  }, [location.pathname])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          NETFLIXDASH
        </Link>

        {/* Links */}
        <ul className="navbar__links">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Início
            </Link>
          </li>
          <li>
            <Link to="/explore" className={isActive('/explore') ? 'active' : ''}>
              Explorar
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <form
            className={`navbar__search ${searchOpen ? 'navbar__search--open' : ''}`}
            onSubmit={handleSearch}
          >
            <input
              ref={searchRef}
              type="text"
              placeholder="Títulos, pessoas, gêneros..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar"
            />
            <button type="button" className="navbar__search-toggle" onClick={() => {
              if (searchOpen && query.trim()) handleSearch({ preventDefault: () => {} })
              else setSearchOpen((v) => !v)
            }} aria-label="Abrir busca">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}
