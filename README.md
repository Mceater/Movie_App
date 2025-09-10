# Movie_App (Imdbwithoutmoney)

A React-based movie discovery application where users can search for movies, manage a favorites list, and explore popular movies using data from TMDb API. Styled with Tailwind CSS for a responsive, modern UI and deployed on Vercel.

🚀 Features

Search Movies: Search for movies by title using the TMDb API.

Favorites Management: Add or remove movies to/from favorites, with data persisted in localStorage.

Responsive Design: Optimized for mobile and desktop views using Tailwind CSS.

Seamless Navigation: Routes handled by React Router to switch between home and favorites.

Secure API Key: TMDb API key securely managed through Vercel environment variables.

🛠️ Tech Stack

Frontend: React, React Router v6

Styling: Tailwind CSS

State Management: React Context API

API Integration: TMDb API (via fetch)

Deployment: Vercel (for both frontend and environment variables)

⚡ Getting Started

Clone the repo:

git clone https://github.com/your-username/movie-explorer.git
cd movie-explorer


Install dependencies:

npm install


Create .env file in the root directory:

VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_API_KEY=your_tmdb_api_key_here


Run the app locally:

npm run dev


Open your browser and visit http://localhost:5173
.

🛠️ Key Implementation Details

Environment Variables: API key securely handled using Vercel Environment Variables to keep it out of version control.

LocalStorage: Favorites list is saved in the browser's localStorage so it persists between page reloads.

Responsive Design: Utilized Tailwind CSS to ensure the app works on both mobile and desktop devices.

📜 License

This project is licensed under the MIT License.
