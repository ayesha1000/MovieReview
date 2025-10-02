import { useEffect, useState } from "react";
import { getMovies, addMovie } from "./api";
import AddMovie from "./components/AddMovie/AddMovie";
import FindMovieDetails from "./components/FindDetails/FindDetails";
import ReviewSubmit from "./components/ReviewSubmit/ReviewSubmit";
import AverageRating from "./components/AverageRating/AverageRating";
import TopMovies from "./components/TopMovies/TopMovies";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  const handleAddMovie = async (newMovie) => {
    await addMovie(newMovie);
    fetchMovies(); // refresh list
  };

  return (
    <div className="App">
      <div className="header">Movies</div>
      <AddMovie handleAddMovie={handleAddMovie} />
      <FindMovieDetails movies={movies} />
      <ReviewSubmit movies={movies} />
      <AverageRating movies={movies} />
      <TopMovies />
    </div>
  );
}

export default App;
