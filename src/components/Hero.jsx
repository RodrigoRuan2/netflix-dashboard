import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBackdropUrl, formatRating } from '../services/api'
import './Hero.css'

export default function Hero({ items = [] }) {
  const [current, setCurrent] = useState(0)

  // Auto-rotate every 8 seconds
  useEffect(() => {
    if (items.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % Math.min(items.length, 5))
    }, 8000)
    return () => clearInterval(timer)
  }, [items.length])

  if (!items.length) return <div className="hero hero--loading skeleton" />

  const item = items[current]
  const isMovie = !item.first_air_date
  const title = item.title || item.name
  const year = (item.release_date || item.first_air_date || '').slice(0, 4)
  const backdropUrl = getBackdropUrl(item.backdrop_path)
  const overview = item.overview?.length > 200
    ? item.overview.slice(0, 200) + '...'
    : item.overview

  return (
    <div className="hero">
      <div className="hero__backdrop">
        {backdropUrl && (
          <img
            key={item.id}
            src={backdropUrl}
            alt={title}
            className="hero__image"
          />
        )}
        <div className="hero__gradient" />
      </div>

      <div className="hero__content fade-in" key={item.id}>
        <div className="hero__meta">
          <span className="hero__type">{isMovie ? '🎬 Filme' : '📺 Série'}</span>
          {year && <span className="hero__year">{year}</span>}
          <span className="hero__rating">★ {formatRating(item.vote_average)}</span>
        </div>

        <h1 className="hero__title">{title}</h1>

        {overview && <p className="hero__overview">{overview}</p>}

        <div className="hero__actions">
          <Link
            to={isMovie ? `/movie/${item.id}` : `/tv/${item.id}`}
            className="btn btn-primary"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M8 5v14l11-7z" />
            </svg>
            Assistir
          </Link>
          <Link
            to={isMovie ? `/movie/${item.id}` : `/tv/${item.id}`}
            className="btn btn-secondary"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            Mais info
          </Link>
        </div>
      </div>

      {/* Dot indicators */}
      {items.length > 1 && (
        <div className="hero__dots">
          {items.slice(0, 5).map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
