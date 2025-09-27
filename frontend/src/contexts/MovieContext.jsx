import { createContext, useState, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
    setToast({ type: "add", title: movie.title });
    setTimeout(() => setToast(null), 2000);
  };

  const removeFromFavorites = (movieId) => {
    const removed = favorites.find((m) => m.id === movieId);
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
    setToast({ type: "remove", title: removed?.title });
    setTimeout(() => setToast(null), 2000);
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 bg-black/80 text-white px-4 py-3 rounded-lg shadow-lg text-sm"
          >
            {toast.type === "add" ? "Added to Favorites:" : "Removed from Favorites:"} {toast.title}
          </motion.div>
        )}
      </AnimatePresence>
    </MovieContext.Provider>
  );
};