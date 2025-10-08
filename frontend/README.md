# 🎬 Movie Discovery App - Frontend

Modern React application for discovering and managing favorite movies with TMDB API integration.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Dependencies

### Core
- **React 18.3.1** - UI framework
- **React Router 7.8.1** - Client-side routing
- **Framer Motion 12.23.22** - Animations

### Styling
- **Tailwind CSS 4.0.0** - Utility-first CSS
- **Flowbite 3.1.2** - UI components

### Development
- **Vite 7.1.2** - Build tool
- **ESLint 9.33.0** - Code linting
- **TypeScript Types** - Type definitions

## 🏗️ Architecture

### Components
- `MovieCard` - Individual movie display
- `NavBar` - Navigation with mobile menu
- `MobileMenu` - Slide-out mobile navigation
- `GenreFilter` - Genre dropdown with sorting
- `GenreMovies` - Genre-filtered movie section

### Pages
- `Home` - Search and popular movies
- `Favorites` - Saved movies grid

### Services
- `api.js` - TMDB API integration functions

### Context
- `MovieContext` - Global state for favorites and notifications

## 🎨 Styling System

### CSS Architecture
- **variables.css** - Design system tokens
- **components.css** - Component-specific styles
- **index.css** - Global styles and utilities

### Design Tokens
```css
/* Spacing Scale */
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */

/* Color System */
--color-primary: #dc2626;
--color-background: #0a0a0a;
--color-surface: #171717;
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px (2-3 cards)
- **Tablet**: 640px - 1024px (3-5 cards)
- **Desktop**: > 1024px (5-7 cards)

### Mobile Features
- Touch-optimized interactions
- Hamburger navigation
- Swipe-friendly carousels
- Reduced spacing for mobile

## 🔧 Development

### Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Lint code
```

### Environment Variables
```bash
VITE_TMDB_API_KEY=your_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

## 🎯 Key Features

### Movie Discovery
- Real-time search
- Genre filtering
- Advanced sorting
- Popular movies

### Favorites System
- Add/remove movies
- Persistent storage
- Toast notifications
- Dedicated page

### Mobile Experience
- Responsive design
- Touch interactions
- Mobile navigation
- Optimized performance

## 🚀 Performance

### Optimizations
- Lazy image loading
- CSS custom properties
- Optimized animations
- Bundle splitting

### Bundle Size
- CSS: ~25KB (gzipped: ~6KB)
- JS: ~307KB (gzipped: ~100KB)

## 🔒 Security

- Environment variables for API keys
- No sensitive data in client
- Proper error handling
- Input sanitization

---

**Built with React + Vite + Tailwind CSS**