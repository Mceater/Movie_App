import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MovieCard from "./MovieCard";
import GenreFilter from "./GenreFilter";
import { discoverMoviesByGenre, discoverMovies } from "../services/api";

function GenreMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState('popularity.desc');

  const fetchMovies = async (genreId, sort) => {
    setLoading(true);
    setError(null);

    try {
      let movieData;
      if (genreId) {
        movieData = await discoverMoviesByGenre(genreId, sort);
      } else {
        movieData = await discoverMovies({ sortBy: sort });
      }
      setMovies(movieData);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(selectedGenre, sortBy);
  }, [selectedGenre, sortBy]);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.section 
      className="genre-movies-section"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="section-header"
        variants={titleVariants}
      >
        <h2 className="section-title">
          Discover Movies
        </h2>
        <p className="section-description">
          Filter by genre and sort to find your perfect movie
        </p>
      </motion.div>

      <motion.div variants={titleVariants}>
        <GenreFilter
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />
      </motion.div>

      {error && (
        <motion.div 
          className="error-message" 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          role="alert"
        >
          {error}
        </motion.div>
      )}

      {loading ? (
        <motion.div 
          className="loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          aria-live="polite"
        >
          <div className="loading-spinner" aria-hidden="true"></div>
          <p>Discovering movies...</p>
        </motion.div>
      ) : (
        <motion.div 
          className="genre-movies-container"
          variants={titleVariants}
        >
          {movies.length > 0 ? (
            <div className="movie-carousel" role="list">
              {movies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  role="listitem"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="empty-state-title">No movies found</h3>
              <p className="empty-state-description">
                Try selecting a different genre or sort option.
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.section>
  );
}

export default GenreMovies;
