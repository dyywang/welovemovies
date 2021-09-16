
const reduceProperties = require("../utils/reduce-properties")
const moviesService = require("./movies.service")
const reviewsService = require("../reviews/reviews.service")
const theatersService = require("../theaters/theaters.service")

async function list(req, res, next){
  const is_showing = req.query.is_showing || false
  console.log(is_showing)
  const data = await moviesService.list(is_showing)
  res.json({data})
}

async function movieExists(req, res, next){
  const movieId = req.params.movieId
  const movie = await moviesService.read(movieId)
  if (movie){
    res.locals.movie = movie
    return next()
  }
  next({status:404, message:`${movieId} cannot be found`})
}

function read(req, res, next){
  const {movie:data} = res.locals
  res.json({data})
}

async function getTheaters(req, res, next){
  const movie = res.locals.movie
  const theaters = await theatersService.listByMovie(movie.movie_id)
  res.json({data:theaters})
}


const reduceCritics = reduceProperties("review_id", {
  critic_id:["critic", "critic_id"],
  preferred_name:["critic", "preferred_name"],
  surname:["critic", "surname"],
  organization_name:["critic", "organization_name"]
})

async function getReviews(req, res, next){
  const movie = res.locals.movie
  const reviews = await reviewsService.listByMovie(movie.movie_id)
  const newReviews = reduceCritics(reviews)
  res.json({data:newReviews})
}

module.exports = {
  list, 
  read:[movieExists, read],
  getTheaters:[movieExists, getTheaters],
  getReviews:[movieExists, getReviews]
}