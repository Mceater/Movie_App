import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getGenres } from "../services/api";

function GenreFilter({ selectedGenre, onGenreChange, sortBy, onSortChange }) {
  const [genres, setGenres] = useState([]);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const sortOptions = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'release_date.desc', label: 'Newest' },
    { value: 'release_date.asc', label: 'Oldest' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'vote_average.asc', label: 'Lowest Rated' },
    { value: 'title.asc', label: 'A-Z' },
    { value: 'title.desc', label: 'Z-A' }
  ];

  useEffect(() => {
    async function fetchGenres() {
      try {
        const genreData = await getGenres();
        setGenres(genreData);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGenres();
  }, []);

  const selectedGenreData = genres.find(g => g.id === selectedGenre);
  const selectedSortData = sortOptions.find(s => s.value === sortBy);

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  return (
    <div className="genre-filter">
      <div className="filter-controls">
        {/* Genre Dropdown */}
        <div className="filter-dropdown">
          <label htmlFor="genre-select" className="filter-label">
            Filter by Genre
          </label>
          <div className="dropdown-container">
            <button
              type="button"
              className="dropdown-button"
              onClick={() => {
                setIsGenreOpen(!isGenreOpen);
                setIsSortOpen(false);
              }}
              aria-expanded={isGenreOpen}
              aria-haspopup="listbox"
              disabled={loading}
            >
              <span className="dropdown-text">
                {loading ? "Loading..." : (selectedGenreData?.name || "All Genres")}
              </span>
              <motion.svg
                animate={{ rotate: isGenreOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="dropdown-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>

            <AnimatePresence>
              {isGenreOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={{ duration: 0.2 }}
                  className="dropdown-menu"
                  role="listbox"
                >
                  <button
                    type="button"
                    className={`dropdown-item ${!selectedGenre ? 'active' : ''}`}
                    onClick={() => {
                      onGenreChange(null);
                      setIsGenreOpen(false);
                    }}
                    role="option"
                    aria-selected={!selectedGenre}
                  >
                    All Genres
                  </button>
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      type="button"
                      className={`dropdown-item ${selectedGenre === genre.id ? 'active' : ''}`}
                      onClick={() => {
                        onGenreChange(genre.id);
                        setIsGenreOpen(false);
                      }}
                      role="option"
                      aria-selected={selectedGenre === genre.id}
                    >
                      {genre.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="filter-dropdown">
          <label htmlFor="sort-select" className="filter-label">
            Sort by
          </label>
          <div className="dropdown-container">
            <button
              type="button"
              className="dropdown-button"
              onClick={() => {
                setIsSortOpen(!isSortOpen);
                setIsGenreOpen(false);
              }}
              aria-expanded={isSortOpen}
              aria-haspopup="listbox"
            >
              <span className="dropdown-text">
                {selectedSortData?.label || "Most Popular"}
              </span>
              <motion.svg
                animate={{ rotate: isSortOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="dropdown-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={{ duration: 0.2 }}
                  className="dropdown-menu"
                  role="listbox"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`dropdown-item ${sortBy === option.value ? 'active' : ''}`}
                      onClick={() => {
                        onSortChange(option.value);
                        setIsSortOpen(false);
                      }}
                      role="option"
                      aria-selected={sortBy === option.value}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(isGenreOpen || isSortOpen) && (
        <div
          className="dropdown-backdrop"
          onClick={() => {
            setIsGenreOpen(false);
            setIsSortOpen(false);
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default GenreFilter;
