import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NavBar() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/5"
    >
      <div className="mx-auto max-w-[1300px] px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-red-600 text-2xl font-extrabold tracking-wide">
          Movie App
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/favorites" className="hover:text-white transition">
            Favorites
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

export default NavBar;
