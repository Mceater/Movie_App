// src/pages/Home.jsx
import { useState, useMemo, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import "../css/MovieCard.css";
import { getPopularMovies, searchMovies } from "../services/api"; // <-- add searchMovies

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const query = searchQuery.trim();
    if (!query || loading) return;

    setError(null);
    setLoading(true);
    try {
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const q = searchQuery.trim().toLowerCase();

  // Show all when query is empty; otherwise filter (startsWith like you had)
  const filtered = useMemo(() => {
    if (!q) return movies;
    return movies.filter((m) => m.title.toLowerCase().startsWith(q));
  }, [q, movies]);

  return (
    <div className="home">
      <form className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          // this is to set the setSearchQuery according to the search input
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
