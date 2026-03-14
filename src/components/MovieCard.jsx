import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getImageUrl, formatRating } from '../services/api'
import './MovieCard.css'

export default function MovieCard({ item, index = 0 }) {
  const [imgError, setImgError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (!item) return null

  const isMovie = item.media_type !== 'tv' && !item.first_air_date
  const title = item.title || item.name || 'Sem título'
  const year = (item.release_date || item.first_air_date || '').slice(0, 4)
  const rating = formatRating(item.vote_average)
  const posterUrl = getImageUrl(item.poster_path, 'w342')
  const linkTo = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`

  return (
    <Link
      to={linkTo}
      className="movie-card fade-in"
      style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
      aria-label={title}
    >
      <div className="movie-card__poster">
        {!imgError && posterUrl ? (
          <>
            {!loaded && <div className="skeleton movie-card__skeleton" />}
            <img
              src={posterUrl}
              alt={title}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setImgError(true)}
              style={{ opacity: loaded ? 1 : 0 }}
            />
          </>
        ) : (
          <div className="movie-card__no-image">
            <span>{title[0]}</span>
          </div>
        )}

        <div className="movie-card__overlay">
          <div className="movie-card__play">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="movie-card__meta">
            {year && <span className="movie-card__year">{year}</span>}
            <span className={`movie-card__rating ${item.vote_average >= 7 ? 'high' : item.vote_average >= 5 ? 'mid' : 'low'}`}>
              ★ {rating}
            </span>
          </div>
        </div>

        {item.vote_average >= 8 && (
          <div className="movie-card__badge">Top</div>
        )}
      </div>

      <div className="movie-card__info">
        <p className="movie-card__title">{title}</p>
      </div>
    </Link>
  )
}
