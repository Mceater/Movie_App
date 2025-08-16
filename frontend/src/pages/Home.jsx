import { useState, useMemo } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Add poster URLs because MovieCard expects movie.url
  const movies = [
    {
      id: 1,
      title: "John Wick",
      release_date: "2020",
      url: "/images/john-wick.jpg",
    },
    {
      id: 2,
      title: "Ballerina",
      release_date: "2025",
      url: "/images/ballerina.jpg",
    },
    { id: 3, title: "F1", release_date: "2025", url: "/images/f1.jpg" },
    {
      id: 4,
      title: "Weapons",
      release_date: "2025",
      url: "/images/weapons.jpg",
    },
  ];

  const q = searchQuery.trim().toLowerCase();

  // Show all when query is empty; otherwise filter (startsWith like you had)
  const filtered = useMemo(() => {
    if (!q) return movies;
    return movies.filter((m) => m.title.toLowerCase().startsWith(q));
  }, [q, movies]);

  const handleSearch = (e) => {
    e.preventDefault();
    // keep the user's query; don't overwrite it with "...."
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* IMPORTANT: class matches your CSS: .movie-carousel-vertical */}
      <div className="movie-carousel-vertical">
        {filtered.length > 0 ? (
          filtered.map((movie) => <MovieCard movie={movie} key={movie.id} />)
        ) : (
          <p className="text-gray-400 px-4">No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
