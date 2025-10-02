import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

function NavBar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="navbar"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container">
          <Link to="/" className="navbar-brand" aria-label="Movie App Home">
            🎬 IMDB WITHOUT MONEY
          </Link>
          
          {/* Desktop Navigation */}
          <div className="navbar-nav">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              aria-current={location.pathname === '/' ? 'page' : undefined}
            >
              Home
            </Link>
            <Link 
              to="/favorites" 
              className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
              aria-current={location.pathname === '/favorites' ? 'page' : undefined}
            >
              Favorites
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            <span className="sr-only">
              {isMobileMenuOpen ? "Close menu" : "Open menu"}
            </span>
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              className="hamburger-icon"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 }
                }}
                transition={{ duration: 0.2 }}
                className="hamburger-line"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.2 }}
                className="hamburger-line"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 }
                }}
                transition={{ duration: 0.2 }}
                className="hamburger-line"
              />
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}

export default NavBar;
