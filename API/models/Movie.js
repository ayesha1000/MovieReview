const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  reviews: [
    {
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, default: "" },
    },
  ],
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
