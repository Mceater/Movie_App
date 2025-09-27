
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <MovieProvider>
      <div className="min-h-screen bg-black text-white">
        <NavBar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <footer className="border-t border-white/10 mt-8">
          <div className="max-w-[1300px] mx-auto px-6 py-10 text-white/50 text-sm">
            <div>Netflix-style Movie App • TailwindCSS + Framer Motion</div>
          </div>
        </footer>
      </div>
    </MovieProvider>
  );
}