const knex = require("../db/connection")

function list(){
  return knex("theaters as a")
          .select("*")
          .leftJoin("movies_theaters as b", "a.theater_id", "b.theater_id")
          .leftJoin("movies as c", "b.movie_id", "c.movie_id")
}


function listByMovie(movieId){
  return knex('movies as a')
          .select(knex.raw("c.theater_id, c.name, address_line_1, address_line_2, city, state, zip, b.is_showing, a.movie_id"))
          .leftJoin('movies_theaters as b', 'a.movie_id', 'b.movie_id')
          .leftJoin('theaters as c', 'b.theater_id', 'c.theater_id')
          .where({"a.movie_id":movieId})
}

module.exports = {
  list,
  listByMovie
}