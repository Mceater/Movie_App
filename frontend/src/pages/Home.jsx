import MovieCard from "../components/MovieCard"

function Home(){
    const movies = [
        {id:1, title: "John Wick", release_date : "2020"},
        {id:2, title: "John Wick 2", release_date : "2022"},
        {id:1, title: "John Wick 3", release_date : "2024"},

    ];

    const handleSearch = () => {};


    return (
    <div className="home">

        <form onSubmit={handleSearch} className = "search-form">
            <input type="text" placeholder="Search for movies"/>
            <button type = "submit" className= "seacrh-button">Search</button>
        </form>




        <div className = "movies-grid">
            {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id}/>
            ))}
        </div>
    </div>
    );
}

export default Home 