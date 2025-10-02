const mongoose = require("mongoose");
const Movie = require("./models/Movie");

// Connect to DB
mongoose
  .connect("mongodb://127.0.0.1:27017/moviesdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Seed movies
const movies = [
  { title: "The Prestige", year: 2006, genre: "Drama, Mystery, Sci-Fi" },
  { title: "The Green Mile", year: 1999, genre: "Crime, Drama, Fantasy" },
  { title: "Once Upon a Time in America", year: 1984, genre: "Crime, Drama" },
  { title: "Whiplash", year: 2014, genre: "Biography, Drama, Sport" },
  { title: "Interstellar", year: 2014, genre: "Drama, Music" },
];

async function seedDB() {
  await Movie.insertMany(movies);
  console.log("Movies added!");
  mongoose.connection.close();
}

seedDB();
