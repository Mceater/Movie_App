import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getMovieDetails } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";

function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
        setError("Failed to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  if (loading) {
    return (
      <main className="page-container">
        <div className="loading-text" aria-live="polite">
          <div className="loading-spinner" aria-hidden="true"></div>
          <p>Loading movie details...</p>
        </div>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="page-container">
        <div className="error-message" role="alert">
          {error || "Movie not found"}
        </div>
        <Link to="/" className="mt-4 inline-block text-primary hover:text-primary-hover">
          ← Back to Home
        </Link>
      </main>
    );
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const imdbId = movie.imdb_id;
  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  // Get top 10 cast members
  const cast = movie.credits?.cast?.slice(0, 10) || [];
  const directors = movie.credits?.crew?.filter(person => person.job === 'Director') || [];
  const writers = movie.credits?.crew?.filter(person => person.job === 'Writer') || [];

  return (
    <main className="movie-details-page">
      {/* Backdrop Image */}
      {backdropUrl && (
        <div className="movie-backdrop">
          <img 
            src={backdropUrl} 
            alt={`${movie.title} backdrop`}
            className="backdrop-image"
            loading="eager"
          />
          <div className="backdrop-overlay"></div>
        </div>
      )}

      <div className="movie-details-container">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="back-button"
          aria-label="Go back"
        >
          ← Back
        </motion.button>

        <div className="movie-details-content">
          {/* Poster and Basic Info */}
          <div className="movie-header">
            {posterUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="movie-poster-large"
              >
                <img
                  src={posterUrl}
                  alt={`${movie.title} poster`}
                  className="poster-image"
                />
              </motion.div>
            )}

            <div className="movie-info-main">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="movie-title-large"
              >
                {movie.title}
              </motion.h1>

              <div className="movie-meta">
                <span>{releaseYear}</span>
                {movie.runtime && <span>•</span>}
                <span>{runtime}</span>
                {movie.genres && movie.genres.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{movie.genres.map(g => g.name).join(', ')}</span>
                  </>
                )}
              </div>

              {/* Ratings */}
              <div className="movie-ratings">
                <div className="rating-item">
                  <span className="rating-label">TMDB Rating</span>
                  <span className="rating-value">{rating}/10</span>
                  <span className="rating-count">({movie.vote_count?.toLocaleString()} votes)</span>
                </div>
                {imdbId && (
                  <div className="rating-item">
                    <span className="rating-label">IMDB</span>
                    <a
                      href={`https://www.imdb.com/title/${imdbId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rating-link"
                    >
                      View on IMDB →
                    </a>
                  </div>
                )}
              </div>

              {/* Favorite Button */}
              <button
                onClick={handleFavoriteClick}
                className={`favorite-btn-large ${isFavorite(movie.id) ? 'active' : ''}`}
                aria-label={isFavorite(movie.id) ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
              >
                <span>{isFavorite(movie.id) ? '❤️' : '🤍'}</span>
                <span>{isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </button>
            </div>
          </div>

          {/* Description */}
          {movie.overview && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="movie-section"
            >
              <h2 className="section-title-details">Overview</h2>
              <p className="movie-overview">{movie.overview}</p>
            </motion.section>
          )}

          {/* Crew */}
          {(directors.length > 0 || writers.length > 0) && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="movie-section"
            >
              <h2 className="section-title-details">Crew</h2>
              <div className="crew-grid">
                {directors.map((director) => (
                  <div key={director.id} className="crew-member">
                    <span className="crew-role">Director</span>
                    <span className="crew-name">{director.name}</span>
                  </div>
                ))}
                {writers.slice(0, 3).map((writer) => (
                  <div key={writer.id} className="crew-member">
                    <span className="crew-role">Writer</span>
                    <span className="crew-name">{writer.name}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Cast */}
          {cast.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="movie-section"
            >
              <h2 className="section-title-details">Cast</h2>
              <div className="cast-grid">
                {cast.map((actor) => (
                  <div key={actor.id} className="cast-member">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/w185${actor.profile_path}`}
                        alt={actor.name}
                        className="cast-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="cast-image-placeholder">
                        <span>{actor.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="cast-info">
                      <span className="cast-name">{actor.name}</span>
                      <span className="cast-character">{actor.character}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;

