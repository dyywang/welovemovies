const knex = require("../db/connection")

function list(){
  return knex("reviews")
          .select("*")
}

function listByMovie(movie_id){
  return knex('movies as a')
          .select(knex.raw('b.review_id, b.content, b.score, b.critic_id, a.movie_id, c.preferred_name, c.surname, c.organization_name'))
          .leftJoin('reviews as b', 'a.movie_id', 'b.movie_id')
          .leftJoin('critics as c', 'b.critic_id', 'c.critic_id')
          .where({'a.movie_id':movie_id})
}

function read(review_id){
  return knex("reviews")
          .select("*")
          .where({review_id:review_id})
          .first()
}

function update(updatedReview){
  return knex("reviews")
          .where({review_id:updatedReview.review_id})
          .update(updatedReview)
          .select("*")
          //.then((updatedRecords)=>updatedRecords[0])
          .then( ()=>read(updatedReview.review_id))
}

function getCriticForReview(updatedReview){
  return knex("reviews as a")
          .leftJoin("critics as b", "a.critic_id", "b.critic_id")
          .where("a.review_id", updatedReview.review_id)
          .select("*")
          .first()
}


function destroy(review_id){
  return knex("reviews")
          .where({review_id:review_id})
          .del()
}

module.exports = {
  list,
  read, 
  update,
  delete:destroy,
  getCriticForReview,
  listByMovie
}