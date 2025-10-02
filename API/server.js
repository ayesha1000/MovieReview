const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Movie = require("./models/Movie");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// --- MongoDB Connection ---
mongoose
  .connect("mongodb://127.0.0.1:27017/moviesdb")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Root route
app.get("/", (req, res) => {
  res.send("Movie Review API is running! Try /movies or /movies/top-rated");
});

// get all movies
app.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Add a new movie
app.post("/movies", async (req, res) => {
  const { title, year, genre } = req.body;
  if (!title || !year || !genre)
    return res.status(400).json({ message: "title, year, genre required" });

  const movie = new Movie({ title, year, genre, reviews: [] });
  await movie.save();
  res.status(201).json(movie);
});

// Get top-rated movies
app.get("/movies/top-rated", async (req, res) => {
  const movies = await Movie.find();
  const ratedMovies = movies
    .filter((m) => m.reviews.length > 0) // filter out movies with no ratings
    .map((m) => {
      const avg = m.reviews.length
        ? m.reviews.reduce((a, b) => a + b.rating, 0) / m.reviews.length //get average ratings for each movie
        : 0;
      return {
        id: m._id,
        title: m.title,
        year: m.year,
        genre: m.genre,
        averageRating: avg.toFixed(2),
      };
    })
    .sort((a, b) => b.averageRating - a.averageRating) //sort ratings in descending order
    .slice(0, 5); //get top 5 movies

  res.json(ratedMovies);
});

// Retrieve details of a movie
app.get("/movies/:title", async (req, res) => {
  try {
    const titleRegex = new RegExp(`^${req.params.title}$`, "i");
    const movie = await Movie.findOne({ title: titleRegex });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch {
    res.status(400).json({ message: "Invalid movie title" });
  }
});

// Submit a review for a movie
app.post("/movies/:title/reviews", async (req, res) => {
  try {
    const titleRegex = new RegExp(`^${req.params.title}$`, "i");
    const movie = await Movie.findOne({ title: titleRegex });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const { rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5)
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });

    movie.reviews.push({ rating, comment: comment || "" });
    await movie.save();

    res.status(201).json({ message: "Review added", movie });
  } catch {
    res.status(400).json({ message: "Invalid movie title" });
  }
});

// Get average rating for a movie
app.get("/movies/:title/rating", async (req, res) => {
  try {
    const titleRegex = new RegExp(`^${req.params.title}$`, "i");
    const movie = await Movie.findOne({ title: titleRegex });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const ratings = movie.reviews.map((r) => r.rating);
    const avg = ratings.length
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
      : "No ratings yet";

    res.json({ movie: movie.title, averageRating: avg });
  } catch {
    res.status(400).json({ message: "Invalid movie title" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Movie Review API running at http://localhost:${PORT}`);
});
