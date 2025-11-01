
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";

export default function App() {
  return (
    <MovieProvider>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
        <footer className="border-t border-white/10 mt-8">
          <div className="max-w-[1300px] mx-auto px-6 py-10 text-white/50 text-sm text-center">
            <p>🎬 Movie Discovery App • Built with React + Tailwind CSS + Framer Motion</p>
          </div>
        </footer>
      </div>
    </MovieProvider>
  );
}