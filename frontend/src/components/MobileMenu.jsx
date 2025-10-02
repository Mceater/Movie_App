import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40
      }
    }
  };

  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: 0.1
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="mobile-menu-backdrop"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <motion.nav
            className="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <div className="mobile-menu-header">
              <h2 className="mobile-menu-title">Menu</h2>
              <button
                className="mobile-menu-close"
                onClick={onClose}
                aria-label="Close menu"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mobile-menu-content">
              <motion.div variants={itemVariants}>
                <Link 
                  to="/" 
                  className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  aria-current={location.pathname === '/' ? 'page' : undefined}
                >
                  <span className="mobile-nav-icon">🏠</span>
                  <span>Home</span>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link 
                  to="/favorites" 
                  className={`mobile-nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
                  aria-current={location.pathname === '/favorites' ? 'page' : undefined}
                >
                  <span className="mobile-nav-icon">❤️</span>
                  <span>Favorites</span>
                </Link>
              </motion.div>
            </div>

            <div className="mobile-menu-footer">
              <p className="mobile-menu-footer-text">
                🎬 Movie Discovery App
              </p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
