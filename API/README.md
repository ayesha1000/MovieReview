# Features

Add new movies
Fetch movie details by title
Submit reviews for movies
Get average rating of a movie
Fetch top-rated movies

# Prerequisites

Node.js (v18+ recommended)
MongoDB (local)

# Installation

## install dependecy using

npm i

## Make sure MongoDB is running locally:

mongod

# Running the project

## Start the server

node server.js

## Seed database (optional)

node seed.js

# API Endpoints

## Get all movies

URL: /movies
Method: GET
Response: Movies object

## Add a new movie

URL: /movies
Method: POST
Body:
{
"title": "Inception",
"year": 2010,
"genre": "Sci-Fi"
}
Response: Newly created movie object

## Retrieve details of a movie

URL: /movies/:title
Method: GET
Response: Movie object with empty reviews

## Submit a review for a movie

URL: /movies/:title/reviews
Method: POST
Body:
{
"rating": 4,
"comment": "Great movie!"
}
Response: Updated movie object with reviews

## Get the average ratings for a movie

URL: /movies/:title/rating
Method: GET
Response:
{
"movie": "Inception",
"averageRating": "4.25"
}

## Get list of top rated movies

URL: /movies/top-rated
Method: GET
Response: List of top 5 movies with ratings (movies with no reviews are excluded)
