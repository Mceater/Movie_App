# 🎬 Movie Discovery App

A modern, responsive movie discovery application built with React that allows users to search, explore, and manage their favorite movies using The Movie Database (TMDB) API. Features a sleek dark theme, smooth animations, and mobile-first design.

![Demo](https://imdbwithoutmoney.vercel.app/)

## ✨ Features

### 🔍 **Movie Discovery**
- **Search Movies**: Real-time search with instant results
- **Popular Movies**: Browse trending movies on the homepage
- **Genre Filtering**: Filter movies by genre with 20+ categories
- **Advanced Sorting**: Sort by popularity, rating, release date, or alphabetically

### ❤️ **Favorites Management**
- **Add/Remove Favorites**: Heart button to save movies
- **Persistent Storage**: Favorites saved in localStorage
- **Visual Feedback**: Toast notifications for actions
- **Favorites Page**: Dedicated page to view saved movies

### 📱 **Mobile-First Design**
- **Responsive Layout**: Optimized for all screen sizes
- **Touch-Friendly**: 44px+ touch targets for accessibility
- **Mobile Navigation**: Hamburger menu with smooth animations
- **Gesture Support**: Swipe-friendly carousels

### 🎨 **Modern UI/UX**
- **Dark Theme**: Netflix-inspired dark interface
- **Smooth Animations**: Framer Motion powered transitions
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages

## 🛠️ Tech Stack

### **Frontend**
- **React 18.3.1** - Modern React with hooks
- **React Router 7.8.1** - Client-side routing
- **Framer Motion 12.23.22** - Smooth animations
- **Tailwind CSS 4.0.0** - Utility-first styling

### **Build Tools**
- **Vite 7.1.2** - Fast build tool and dev server
- **ESLint 9.33.0** - Code linting and formatting
- **TypeScript Types** - Type safety for React

### **API Integration**
- **TMDB API** - Movie data and images
- **Fetch API** - Modern HTTP requests
- **Environment Variables** - Secure API key management

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/movie-app.git
   cd movie-app/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Add your TMDB API key
   VITE_TMDB_API_KEY=your_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── MovieCard.jsx    # Movie display card
│   │   ├── NavBar.jsx       # Navigation bar
│   │   ├── MobileMenu.jsx   # Mobile navigation
│   │   ├── GenreFilter.jsx  # Genre dropdown filter
│   │   └── GenreMovies.jsx  # Genre movie section
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Homepage with search
│   │   └── Favorites.jsx    # Favorites page
│   ├── contexts/            # React Context
│   │   └── MovieContext.jsx # Global state management
│   ├── services/            # API services
│   │   └── api.js          # TMDB API functions
│   ├── styles/             # CSS styling
│   │   ├── variables.css   # CSS custom properties
│   │   └── components.css  # Component styles
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json           # Dependencies
└── vite.config.js         # Vite configuration
```

## 🎯 Key Features Explained

### **Genre Filtering System**
```javascript
// Discover movies by genre
const movies = await discoverMoviesByGenre(28, 'popularity.desc'); // Action movies
const genres = await getGenres(); // Get all available genres
```

### **Responsive Design System**
```css
/* Mobile-first spacing */
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
```

### **Touch-Optimized Interactions**
- Minimum 44px touch targets
- Smooth scroll snap behavior
- Touch feedback animations
- Mobile gesture support

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Production
npm run build        # Creates optimized build
```

## 📱 Mobile Features

### **Responsive Breakpoints**
- **Mobile**: 320px - 640px (2-3 movie cards)
- **Tablet**: 640px - 1024px (3-5 movie cards)  
- **Desktop**: 1024px+ (5-7 movie cards)

### **Mobile Navigation**
- Hamburger menu with slide animation
- Touch-friendly dropdown filters
- Optimized carousel scrolling
- Reduced motion support

## 🎨 Design System

### **Color Palette**
```css
--color-primary: #dc2626;        /* Red accent */
--color-background: #0a0a0a;     /* Dark background */
--color-surface: #171717;        /* Card background */
--color-text-primary: #ffffff;  /* Primary text */
```

### **Typography**
- System font stack for performance
- Responsive font sizes
- Proper line heights for readability

## 🔒 Security & Performance

### **API Security**
- Environment variables for API keys
- No sensitive data in client code
- Proper error handling

### **Performance Optimizations**
- Lazy loading images
- Optimized bundle splitting
- CSS custom properties for consistency
- Reduced motion preferences support

## 🌐 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### **Manual Deployment**
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **The Movie Database (TMDB)** for providing the movie API
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations

## 📞 Support

If you have any questions or need help:

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/movie-app/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/movie-app/discussions)

---

**Made with ❤️ and React**
