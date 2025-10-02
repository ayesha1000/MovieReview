import PropTypes from "prop-types";
import "./MovieList.css";

const MovieList = ({ movies }) => {
  return (
    <div className="movies-list">
      <ul>
        {movies.map((m) => (
          <li key={m._id}>
            <span className="title">{m.title}</span>
            <span className="meta">
              ({m.year}) – {m.genre}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
