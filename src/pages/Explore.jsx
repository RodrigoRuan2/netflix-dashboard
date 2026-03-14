import { useEffect, useState } from 'react'
import {
  getMovieGenres,
  discoverByGenre,
  getPopular,
  getTopRated,
  getPopularTV,
} from '../services/api'
import MovieCard from '../components/MovieCard'
import './Explore.css'

const TABS = [
  { id: 'popular', label: 'Populares' },
  { id: 'top_rated', label: 'Mais Votados' },
  { id: 'tv', label: 'Séries' },
]

export default function Explore() {
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [activeTab, setActiveTab] = useState('popular')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMovieGenres().then((d) => setGenres(d.genres || []))
  }, [])

  useEffect(() => {
    setLoading(true)
    setItems([])
    const fetcher = selectedGenre
      ? () => discoverByGenre(selectedGenre)
      : activeTab === 'popular'
      ? getPopular
      : activeTab === 'top_rated'
      ? getTopRated
      : getPopularTV

    fetcher()
      .then((d) => setItems(d.results || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [activeTab, selectedGenre])

  const handleGenre = (id) => {
    setSelectedGenre((prev) => (prev === id ? null : id))
  }

  return (
    <div className="explore">
      <div className="explore__header">
        <h1>Explorar</h1>

        {/* Category tabs */}
        <div className="explore__tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`explore__tab ${activeTab === tab.id && !selectedGenre ? 'active' : ''}`}
              onClick={() => { setActiveTab(tab.id); setSelectedGenre(null) }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Genre pills */}
        <div className="explore__genres">
          {genres.map((g) => (
            <button
              key={g.id}
              className={`explore__genre ${selectedGenre === g.id ? 'active' : ''}`}
              onClick={() => handleGenre(g.id)}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      <div className="explore__grid">
        {loading
          ? Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="skeleton explore__skeleton" />
            ))
          : items.map((item, i) => (
              <MovieCard key={item.id} item={item} index={i} />
            ))}
      </div>

      {!loading && items.length === 0 && (
        <p className="explore__empty">Nenhum resultado encontrado.</p>
      )}
    </div>
  )
}
