import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorite movies yet</h2>
        <p>Start adding movies to your favorites and they will appear here!</p>
      </div>
    );
  } else {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <b>
          <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
        </b>
      </div>
    );
  }
}

export default Favorites;
