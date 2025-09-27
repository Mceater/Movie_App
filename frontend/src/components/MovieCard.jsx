import { motion } from "framer-motion";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="movie-card relative snap-start shrink-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] aspect-[2/3] rounded-lg overflow-hidden bg-neutral-900 shadow-xl"
    >
      <div className="movie-poster relative w-full h-full">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        <div className="movie-overlay absolute inset-0 bg-gradient-to-b from-black/10 to-black/80 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
          <button
            className={`absolute top-3 right-3 text-white text-xl p-2 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 ${
              favorite ? "text-red-500" : ""
            }`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>

      <div className="movie-info absolute inset-x-0 bottom-0 p-3 md:p-4 bg-black/60 text-white backdrop-blur">
        <h3 className="text-sm md:text-base font-semibold line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-xs md:text-sm text-white/70">{movie.release_date}</p>
      </div>
    </motion.div>
  );
}

export default MovieCard;