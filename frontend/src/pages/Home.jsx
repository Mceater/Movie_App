import { useState, useEffect, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import GenreMovies from "../components/GenreMovies";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const query = searchQuery.trim();
    setError(null);
    setLoading(true);

    try {
      if (!query) {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } else {
        const searchResults = await searchMovies(query);
        setMovies(searchResults);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="page-container">
      {/* Search Section */}
      <section aria-label="Search movies">
        <div className="search-form">
          <form onSubmit={(e) => e.preventDefault()} role="search">
            <label htmlFor="movie-search" className="sr-only">
              Search for movies
            </label>
            <input
              id="movie-search"
              type="search"
              placeholder="Search for movies..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-describedby={error ? "search-error" : undefined}
            />
          </form>
        </div>

        {error && (
          <div className="error-message" id="search-error" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-text" aria-live="polite">
            <div className="loading-spinner" aria-hidden="true"></div>
            <p>Loading movies...</p>
          </div>
        ) : (
          <div aria-label={searchQuery.trim() ? "Search results" : "Popular movies"}>
            {/* Section Title */}
            <div className="section-header">
              <h2 className="section-title">
                {searchQuery.trim() ? `Search Results for "${searchQuery.trim()}"` : "Popular Movies"}
              </h2>
              {!searchQuery.trim() && (
                <p className="section-description">
                  Trending movies everyone is watching
                </p>
              )}
            </div>

            {movies.length > 0 ? (
              <div className="movie-carousel" role="list">
                {movies.map((movie) => (
                  <div key={movie.id} role="listitem">
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3 className="empty-state-title">No movies found</h3>
                <p className="empty-state-description">
                  {searchQuery.trim() 
                    ? `No results for "${searchQuery.trim()}". Try a different search term.`
                    : "Unable to load movies at this time. Please try again later."
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Genre Movies Section - Only show when not searching */}
      {!searchQuery.trim() && <GenreMovies />}
    </main>
  );
}

export default Home;
