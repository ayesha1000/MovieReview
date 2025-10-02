import { useState } from "react";
import PropTypes from "prop-types";
import { getMovieByTitle } from "../../api";
import "./FindDetails.css";
import "../../App.css";

const FindMovieDetails = ({ movies }) => {
  const DEFAULT_VALUE = {
    title: "",
    year: "",
    genre: "",
  };
  const [movieName, setMovieName] = useState("");
  const [error, setError] = useState("");
  const [movieDetails, setMovieDetails] = useState(DEFAULT_VALUE);

  const onChangeInput = (value) => {
    setMovieName(value);
    if (error) {
      setError("");
    }
    if (Object.values(movieDetails).some((value) => value)) {
      setMovieDetails(DEFAULT_VALUE);
    }
  };

  const onClickSubmit = async () => {
    const data = await getMovieByTitle(movieName);
    setMovieName("");
    if (data.title) {
      setMovieDetails(data);
    } else if (data.message) {
      setError(data.message);
    }
  };
  return (
    <div className="details-container">
      <p className="title">Find Movie Details</p>
      <div className="input-fields">
        <select
          value={movieName}
          onChange={(e) => onChangeInput(e.target.value)}
        >
          <option value="" disabled>
            Select a movie
          </option>
          {movies.map((movie) => (
            <option value={movie.title}>{movie.title}</option>
          ))}
        </select>
      </div>
      <button onClick={onClickSubmit}>Submit</button>

      {movieDetails && Object.values(movieDetails).some((value) => value) && (
        <div className="movie-info">
          <p className="movie-title">
            Name: <span className="subtitle">{movieDetails.title}</span>
          </p>
          <p className="movie-title">
            Year: <span className="subtitle">{movieDetails.year}</span>
          </p>
          <p className="movie-title">
            Genre: <span className="subtitle">{movieDetails.genre}</span>
          </p>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

FindMovieDetails.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FindMovieDetails;
