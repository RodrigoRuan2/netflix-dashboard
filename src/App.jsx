import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MovieRow from './components/MovieRow'
import MovieDetails from './pages/MovieDetails'
import Explore from './pages/Explore'
import SearchResults from './pages/SearchResults'
import {
  getTrending,
  getPopular,
  getTopRated,
  getNowPlaying,
  getPopularTV,
  getTopRatedTV,
} from './services/api'

function HomePage() {
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  const [popularTV, setPopularTV] = useState([])
  const [topRatedTV, setTopRatedTV] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [t, p, tr, np, ptv, trtv] = await Promise.all([
          getTrending(),
          getPopular(),
          getTopRated(),
          getNowPlaying(),
          getPopularTV(),
          getTopRatedTV(),
        ])
        setTrending(t.results || [])
        setPopular(p.results || [])
        setTopRated(tr.results || [])
        setNowPlaying(np.results || [])
        setPopularTV(ptv.results || [])
        setTopRatedTV(trtv.results || [])
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <>
      <Hero items={trending} />
      <div style={{ paddingTop: '32px' }}>
        <MovieRow title="🔥 Em Alta Esta Semana" items={trending} loading={loading} />
        <MovieRow title="🎬 Filmes Populares" items={popular} loading={loading} />
        <MovieRow title="Em Cartaz nos Cinemas" items={nowPlaying} loading={loading} />
        <MovieRow title="⭐ Mais Bem Avaliados" items={topRated} loading={loading} />
        <MovieRow title="📺 Séries Populares" items={popularTV} loading={loading} />
        <MovieRow title="Séries Mais Votadas" items={topRatedTV} loading={loading} />
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetails type="movie" />} />
        <Route path="/tv/:id" element={<MovieDetails type="tv" />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  )
}
