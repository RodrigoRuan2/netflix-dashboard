import { supabase } from "../lib/supabase";

export const IMG_BASE = "https://image.tmdb.org/t/p";

const cache = new Map();

async function fetchTMDB(action, params = {}) {
  const cacheKey = JSON.stringify({ action, ...params });

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const { data, error } = await supabase.functions.invoke("tmdb", {
    body: {
      action,
      ...params,
    },
  });

  if (error) {
    throw new Error(`Supabase function error: ${error.message}`);
  }

  cache.set(cacheKey, data);
  return data;
}

export const getTrending = (timeWindow = "week") =>
  fetchTMDB("trending", { mediaType: "movie", timeWindow });

export const getPopular = () => fetchTMDB("moviePopular");

export const getTopRated = () => fetchTMDB("movieTopRated");

export const getNowPlaying = () => fetchTMDB("movieNowPlaying");

export const getUpcoming = () => fetchTMDB("movieUpcoming");

export const getMovieDetails = (id) =>
  fetchTMDB("movieDetails", {
    id,
    append_to_response: "credits,videos,similar,recommendations",
  });

export const searchMovies = (query, page = 1) =>
  fetchTMDB("searchMulti", {
    query,
    page,
    include_adult: false,
  });

export const getPopularTV = () => fetchTMDB("tvPopular");

export const getTopRatedTV = () => fetchTMDB("tvTopRated");

export const getTVDetails = (id) =>
  fetchTMDB("tvDetails", {
    id,
    append_to_response: "credits,videos,similar,recommendations",
  });

export const getMovieGenres = () => fetchTMDB("movieGenres");

export const getTVGenres = () => fetchTMDB("tvGenres");

export const discoverByGenre = (genreId, page = 1) =>
  fetchTMDB("discoverMovie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
    page,
  });

export const getImageUrl = (path, size = "w500") =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export const getBackdropUrl = (path, size = "original") =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export const formatRuntime = (minutes) => {
  if (!minutes) return "N/A";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatRating = (rating) =>
  rating ? rating.toFixed(1) : "N/A";