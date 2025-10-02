import PropTypes from "prop-types";
import { useState } from "react";
import "../../App.css";

const AddMovie = ({ handleAddMovie }) => {
  const DEFAULT_VALUE = { title: "", year: "", genre: "" };
  const [newMovie, setNewMovie] = useState(DEFAULT_VALUE);
  const [message, setMessage] = useState("");

  const onClickSubmit = () => {
    if (!newMovie.title || newMovie.year == null || !newMovie.genre) {
      setMessage("Error: Please provide title, year, and genre.");
      return;
    }
    handleAddMovie(newMovie);
    setNewMovie(DEFAULT_VALUE);
    setMessage("Movie added");
  };

  return (
    <div className="details-container">
      <p className="title">Add Movie</p>
      <div className="input-fields">
        <input
          placeholder="Title"
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          value={newMovie.title}
        />
        <input
          placeholder="Year"
          type="number"
          value={newMovie.year}
          onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
        />
        <input
          placeholder="Genre"
          value={newMovie.genre}
          onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
        />
      </div>
      <button onClick={onClickSubmit}>Add Movie</button>
      {message && <p>{message}</p>}
    </div>
  );
};

AddMovie.propTypes = {
  handleAddMovie: PropTypes.func.isRequired,
};

export default AddMovie;
