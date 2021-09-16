const knex = require("../db/connection")

function list(is_showing = false){
  if (!is_showing)
    return knex("movies")
      .select("*")
  else
    return knex("movies as a")
      .leftJoin("movies_theaters as b", "a.movie_id", "b.movie_id")
      .where("b.is_showing", true)
      .select(knex.raw("distinct a.*"))
}

function read(movieId){
  return knex("movies")
    .select(knex.raw("movie_id, title, runtime_in_minutes, rating, description, image_url"))
    .where({movie_id: movieId})
    .first()
}

module.exports = {
  list,
  read
}