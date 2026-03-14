import { useRef, useState } from 'react'
import MovieCard from './MovieCard'
import './MovieRow.css'

export default function MovieRow({ title, items = [], loading = false }) {
  const rowRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    const el = rowRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
  }

  const scroll = (dir) => {
    const el = rowRef.current
    if (!el) return
    const amount = el.clientWidth * 0.75
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' })
    setTimeout(updateScrollButtons, 400)
  }

  const skeletons = Array.from({ length: 7 })

  return (
    <section className="movie-row">
      <h2 className="movie-row__title">{title}</h2>

      <div className="movie-row__wrapper">
        {canScrollLeft && (
          <button
            className="movie-row__arrow movie-row__arrow--left"
            onClick={() => scroll('left')}
            aria-label="Rolar para esquerda"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        <div
          className="movie-row__list"
          ref={rowRef}
          onScroll={updateScrollButtons}
        >
          {loading
            ? skeletons.map((_, i) => (
                <div key={i} className="skeleton movie-row__skeleton-card" />
              ))
            : items.map((item, i) => (
                <div key={item.id} className="movie-row__item">
                  <MovieCard item={item} index={i} />
                </div>
              ))}
        </div>

        {canScrollRight && (
          <button
            className="movie-row__arrow movie-row__arrow--right"
            onClick={() => scroll('right')}
            aria-label="Rolar para direita"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
    </section>
  )
}
