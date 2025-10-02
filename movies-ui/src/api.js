const API_BASE = "http://localhost:5000";

export const getMovies = async () => {
  const res = await fetch(`${API_BASE}/movies`);
  return res.json();
};

export const getMovieByTitle = async (title) => {
  const res = await fetch(`${API_BASE}/movies/${title}`);
  return res.json();
};

export const getTopRatedMovies = async () => {
  const res = await fetch(`${API_BASE}/movies/top-rated`);
  return res.json();
};

export const addMovie = async (movie) => {
  const res = await fetch(`${API_BASE}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  return res.json();
};

export const addReview = async (title, review) => {
  const res = await fetch(`${API_BASE}/movies/${title}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  return res.json();
};

export const getMovieRating = async (title) => {
  const res = await fetch(`${API_BASE}/movies/${title}/rating`);
  return res.json();
};
