import { useState } from "react";
import PropTypes from "prop-types";
import { getMovieRating } from "../../api";
import "../../App.css";

const AverageRating = ({ movies }) => {
  const DEFAULT_VALUE = { movie: "", averageRating: "" };
  const [movieName, setMovieName] = useState("");
  const [error, setError] = useState("");
  const [ratings, setRatings] = useState(DEFAULT_VALUE);

  const onChangeInput = (value) => {
    setMovieName(value);
    if (error) {
      setError("");
    }
    if (ratings.averageRating) {
      setRatings(DEFAULT_VALUE);
    }
  };

  const onClickSubmit = async () => {
    const data = await getMovieRating(movieName);
    setMovieName("");
    if (data.averageRating) {
      setRatings(data);
    } else if (data.message) {
      setError(data.message);
    }
  };
  return (
    <div className="details-container">
      <p className="title">Find Average ratings for a movie</p>
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

      {ratings.movie && (
        <p>
          Average ratings for {ratings.movie} is {ratings.averageRating}
        </p>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

AverageRating.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AverageRating;
