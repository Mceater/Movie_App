import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  return (
    <main className="page-container">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          My Favorites
          {favorites.length > 0 && (
            <span className="text-lg font-normal text-white/70 ml-2">
              ({favorites.length} {favorites.length === 1 ? 'movie' : 'movies'})
            </span>
          )}
        </h1>
      </header>
      
      {favorites.length === 0 ? (
        <div className="empty-state">
          <h2 className="empty-state-title">No favorite movies yet!</h2>
          <p className="empty-state-description">
            Discover movies on the home page and add them to your favorites to see them here.
          </p>
        </div>
      ) : (
        <section aria-label="Favorite movies">
          <div className="favorites-grid">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Favorites;