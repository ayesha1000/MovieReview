import { useState } from "react";
import { getTopRatedMovies } from "../../api";
import "../../App.css";

const TopMovies = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const onClickSubmit = async () => {
    const data = await getTopRatedMovies();
    setMovieDetails(data);
  };
  return (
    <div className="details-container">
      <p className="title">Find Top Rated Movies</p>
      <button onClick={onClickSubmit}>Click to Find</button>

      {movieDetails.length > 0 &&
        movieDetails.map((movie) => (
          <div className="movie-info">
            <p className="movie-title">
              Name: <span className="subtitle">{movie.title}</span>
            </p>
            <p className="movie-title">
              Year: <span className="subtitle">{movie.year}</span>
            </p>
            <p className="movie-title">
              Genre: <span className="subtitle">{movie.genre}</span>
            </p>
            <p className="movie-title">
              Average Rating:{" "}
              <span className="subtitle">{movie.averageRating}</span>
            </p>
          </div>
        ))}
    </div>
  );
};

export default TopMovies;
