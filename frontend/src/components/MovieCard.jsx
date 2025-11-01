import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="movie-card"
      role="article"
      aria-label={`${movie.title} (${releaseYear})`}
    >
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} poster`}
          className="movie-poster-img"
          loading="lazy"
        />

        <div className="movie-overlay" aria-hidden="true">
          <button
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={onFavoriteClick}
            aria-label={favorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
            type="button"
          >
            <span aria-hidden="true">
              {favorite ? '❤️' : '🤍'}
            </span>
            <span className="sr-only">
              {favorite ? 'Remove from favorites' : 'Add to favorites'}
            </span>
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title" title={movie.title}>
          {movie.title}
        </h3>
        <p className="movie-date">
          {releaseYear}
        </p>
      </div>
      </Link>
    </motion.article>
  );
}

export default MovieCard;