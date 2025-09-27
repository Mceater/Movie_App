// src/pages/Home.jsx
import { useState, useMemo, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import "../css/MovieCard.css";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const query = searchQuery.trim();

    setError(null);
    setLoading(true);

    try {
      if (!query) {
        // If query is empty → load popular movies again
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } else {
        // Otherwise → search
        const searchResults = await searchMovies(query);
        setMovies(searchResults);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  }

  // Re-run fetch whenever query changes
  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  // Initial load (popular movies)
  useEffect(() => {
    fetchData();
  }, []);

  const q = searchQuery.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return movies;
    return movies.filter((m) => m.title.toLowerCase().startsWith(q));
  }, [q, movies]);

  return (
    <div className="home">
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault(); // prevent reload on Enter
        }}
      >
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading px-4 text-gray-400">Loading…</div>
      ) : (
        <div className="movie-carousel-vertical">
          {filtered.length > 0 ? (
            filtered.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          ) : (
            <p className="text-gray-400 px-4">No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
