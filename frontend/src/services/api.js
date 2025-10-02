const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export async function getPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  const data = await res.json();
  return data.results;
}

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  if (!res.ok) throw new Error("Failed to search movies");
  const data = await res.json();
  return data.results;
}

export async function getGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch genres");
  const data = await res.json();
  return data.genres;
}

export async function discoverMoviesByGenre(genreId, sortBy = 'popularity.desc') {
  const params = new URLSearchParams({
    api_key: API_KEY,
    with_genres: genreId,
    sort_by: sortBy,
    include_adult: 'false',
    include_video: 'false',
    page: '1'
  });
  
  const res = await fetch(`${BASE_URL}/discover/movie?${params}`);
  if (!res.ok) throw new Error("Failed to discover movies by genre");
  const data = await res.json();
  return data.results;
}

export async function discoverMovies(options = {}) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    sort_by: options.sortBy || 'popularity.desc',
    include_adult: 'false',
    include_video: 'false',
    page: '1'
  });
  
  const res = await fetch(`${BASE_URL}/discover/movie?${params}`);
  if (!res.ok) throw new Error("Failed to discover movies");
  const data = await res.json();
  return data.results;
}
