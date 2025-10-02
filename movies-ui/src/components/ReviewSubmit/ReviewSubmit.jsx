import PropTypes from "prop-types";
import { useState } from "react";
import { addReview } from "../../api";
import "../../App.css";
import "./ReviewSubmit.css";

const ReviewSubmit = ({ movies }) => {
  const DEFAULT_VALUE = {
    title: "",
    ratings: "",
    comments: "",
  };
  const [movie, setMovie] = useState(DEFAULT_VALUE);
  const [message, setMessage] = useState("");

  const onClickSubmit = async () => {
    if (!movie.title || movie.ratings == null || !movie.comments) {
      setMessage("Error: Please provide title, rating, and comment.");
      return;
    }
    const response = await addReview(movie.title, {
      rating: movie.ratings,
      comment: movie.comments,
    });

    setMessage(response.message);
    setMovie(DEFAULT_VALUE);
  };

  return (
    <div className="details-container">
      <p className="title">Submit Review</p>
      <div className="movies-review">
        <label>
          <p>Movie Name: </p>
          <select
            value={movie.title}
            onChange={(e) => setMovie({ ...movie, title: e.target.value })}
          >
            <option value="" disabled>
              Select a movie
            </option>
            {movies.map((movie) => (
              <option value={movie.title}>{movie.title}</option>
            ))}
          </select>
        </label>
        <label>
          <p>Rating (0-5):</p>
          <select
            value={movie.ratings}
            onChange={(e) =>
              setMovie({ ...movie, ratings: parseInt(e.target.value, 10) })
            }
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label>
          <p>Comments:</p>
          <textarea
            rows={4}
            placeholder="Comments"
            value={movie.comments}
            onChange={(e) => setMovie({ ...movie, comments: e.target.value })}
          />
        </label>
      </div>
      <button onClick={onClickSubmit}>Add Review</button>
      {message && <p>{message}</p>}
    </div>
  );
};

ReviewSubmit.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReviewSubmit;
