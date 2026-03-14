import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  getMovieDetails,
  getTVDetails,
  getImageUrl,
  getBackdropUrl,
  formatRuntime,
  formatDate,
  formatRating,
} from '../services/api'
import MovieCard from '../components/MovieCard'
import './MovieDetails.css'

export default function MovieDetails({ type = 'movie' }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [trailerOpen, setTrailerOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const fetcher = type === 'tv' ? getTVDetails : getMovieDetails
    fetcher(id)
      .then(setData)
      .catch(() => setError('Não foi possível carregar os detalhes.'))
      .finally(() => setLoading(false))
    window.scrollTo(0, 0)
  }, [id, type])

  if (loading) return <div className="details-loading"><div className="skeleton details-skeleton" /></div>
  if (error)   return <div className="details-error"><p>{error}</p><button className="btn btn-secondary" onClick={() => navigate(-1)}>Voltar</button></div>
  if (!data)   return null

  const title = data.title || data.name
  const year = (data.release_date || data.first_air_date || '').slice(0, 4)
  const backdropUrl = getBackdropUrl(data.backdrop_path)
  const posterUrl = getImageUrl(data.poster_path, 'w342')
  const genres = data.genres || []
  const cast = data.credits?.cast?.slice(0, 10) || []
  const crew = data.credits?.crew || []
  const director = crew.find((c) => c.job === 'Director')
  const similar = [...(data.similar?.results || []), ...(data.recommendations?.results || [])]
    .filter((r) => r.poster_path)
    .slice(0, 12)

  const trailer = data.videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  )

  return (
    <div className="details">
      {/* Backdrop */}
      <div className="details__backdrop">
        {backdropUrl && <img src={backdropUrl} alt={title} />}
        <div className="details__backdrop-gradient" />
      </div>

      <div className="details__content">
        {/* Back button */}
        <button className="details__back" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Voltar
        </button>

        <div className="details__main">
          {/* Poster */}
          {posterUrl && (
            <div className="details__poster">
              <img src={posterUrl} alt={title} />
            </div>
          )}

          {/* Info */}
          <div className="details__info">
            <div className="details__badges">
              {genres.slice(0, 3).map((g) => (
                <span key={g.id} className="details__badge">{g.name}</span>
              ))}
            </div>

            <h1 className="details__title">{title}</h1>

            <div className="details__meta">
              {year && <span>{year}</span>}
              {data.runtime && <span>{formatRuntime(data.runtime)}</span>}
              {data.number_of_seasons && <span>{data.number_of_seasons} temporada{data.number_of_seasons > 1 ? 's' : ''}</span>}
              <span className="details__rating">★ {formatRating(data.vote_average)}</span>
              {data.vote_count > 0 && <span className="details__votes">{data.vote_count.toLocaleString('pt-BR')} votos</span>}
            </div>

            {director && (
              <p className="details__director">
                Dirigido por <strong>{director.name}</strong>
              </p>
            )}

            {data.overview && (
              <p className="details__overview">{data.overview}</p>
            )}

            <div className="details__actions">
              {trailer && (
                <button className="btn btn-primary" onClick={() => setTrailerOpen(true)}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Trailer
                </button>
              )}
              <div className="details__extra">
                {data.release_date && (
                  <p>Lançamento: <strong>{formatDate(data.release_date)}</strong></p>
                )}
                {data.original_language && (
                  <p>Idioma: <strong>{data.original_language.toUpperCase()}</strong></p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <section className="details__cast">
            <h2>Elenco</h2>
            <div className="details__cast-list">
              {cast.map((person) => (
                <div key={person.id} className="cast-card">
                  <div className="cast-card__img">
                    {person.profile_path ? (
                      <img
                        src={getImageUrl(person.profile_path, 'w185')}
                        alt={person.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="cast-card__placeholder">
                        {person.name[0]}
                      </div>
                    )}
                  </div>
                  <p className="cast-card__name">{person.name}</p>
                  <p className="cast-card__character">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar */}
        {similar.length > 0 && (
          <section className="details__similar">
            <h2>Você também pode gostar</h2>
            <div className="details__similar-grid">
              {similar.map((item, i) => (
                <MovieCard key={item.id} item={{ ...item, media_type: type }} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Trailer modal */}
      {trailerOpen && trailer && (
        <div className="trailer-modal" onClick={() => setTrailerOpen(false)}>
          <div className="trailer-modal__inner" onClick={(e) => e.stopPropagation()}>
            <button className="trailer-modal__close" onClick={() => setTrailerOpen(false)}>✕</button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Trailer"
            />
          </div>
        </div>
      )}
    </div>
  )
}
