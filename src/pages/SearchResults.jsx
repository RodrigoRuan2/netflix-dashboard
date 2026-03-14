import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies } from '../services/api'
import MovieCard from '../components/MovieCard'
import './SearchResults.css'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchResults = useCallback(async (q, p = 1) => {
    if (!q.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await searchMovies(q, p)
      const filtered = (data.results || []).filter(
        (r) => r.media_type !== 'person' && (r.poster_path || r.backdrop_path)
      )
      setResults(p === 1 ? filtered : (prev) => [...prev, ...filtered])
      setTotalPages(data.total_pages || 1)
    } catch (err) {
      setError('Erro ao buscar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setPage(1)
    setResults([])
    fetchResults(query, 1)
  }, [query, fetchResults])

  const loadMore = () => {
    const next = page + 1
    setPage(next)
    fetchResults(query, next)
  }

  return (
    <div className="search-page">
      <div className="search-page__header">
        <h1>
          {query
            ? <>Resultados para <span>"{query}"</span></>
            : 'Busca'}
        </h1>
        {!loading && results.length > 0 && (
          <p className="search-page__count">{results.length} resultados</p>
        )}
      </div>

      {error && <p className="search-page__error">{error}</p>}

      {!loading && results.length === 0 && query && !error && (
        <div className="search-page__empty">
          <p>Nenhum resultado para "{query}"</p>
          <p className="search-page__hint">Tente palavras-chave diferentes</p>
        </div>
      )}

      <div className="search-page__grid">
        {results.map((item, i) => (
          <MovieCard key={`${item.id}-${item.media_type}`} item={item} index={i} />
        ))}
        {loading && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton search-page__skeleton" />
        ))}
      </div>

      {!loading && page < totalPages && results.length > 0 && (
        <div className="search-page__more">
          <button className="btn btn-secondary" onClick={loadMore}>
            Carregar mais
          </button>
        </div>
      )}
    </div>
  )
}
