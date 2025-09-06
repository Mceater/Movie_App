const API_KEY = "0f50635a0fac9a7da8fdf374a6f46481";
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    const response= await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json()
    return data.results
};


export const searchMovies = async (query) => {
    const response= await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&{encodeURIComponent(query)}`);
    const data = await response.json()
    return data.results
};