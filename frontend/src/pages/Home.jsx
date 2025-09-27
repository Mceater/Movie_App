import { useState, useMemo, useEffect } from "react";
import MovieCard from "../components/MovieCard";
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
  }

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const q = searchQuery.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return movies;
    return movies.filter((m) => m.title.toLowerCase().startsWith(q));
  }, [q, movies]);

  return (
    <div className="home w-full py-8">
      <form
        className="search-form max-w-[600px] mx-auto mb-8 flex gap-4 px-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search for movies..."
          className="flex-1 px-4 py-3 rounded-md bg-neutral-800 text-white text-base focus:outline-none focus:ring-2 focus:ring-neutral-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {loading ? (
        <div className="text-gray-400 text-center">Loading…</div>
      ) : (
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

          <div className="movie-carousel-vertical flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] px-6" style={{ WebkitOverflowScrolling: "touch" }}>
            <style>{`.movie-carousel-vertical::-webkit-scrollbar{display:none}`}</style>
            {filtered.length > 0 ? (
              filtered.map((movie) => <MovieCard movie={movie} key={movie.id} />)
            ) : (
              <p className="text-gray-400 px-4">No movies found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
