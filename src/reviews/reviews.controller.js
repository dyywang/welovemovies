const reviewsService = require("./reviews.service")
const reduceProperties = require("../utils/reduce-properties")


async function list(req, res, next){
  const data = await reviewsService.list()
  res.json({data})
}

function reviewExists(req, res, next){
 reviewsService
  .read(req.params.reviewId)
  .then((review)=>{
    if(review) {
      res.locals.review = review
      return next()
    }
    next({status:404, message: `Review cannot be found.`})
  })
  .catch(next)
}

async function read(req, res, next){
  res.json({data:res.locals.review})
}

const reduceCritics = reduceProperties("review_id", {
  //critic_id:["critic", "critic_id"],
  preferred_name:["critic", "preferred_name"],
  surname:["critic", "surname"],
  organization_name:["critic", "organization_name"]
})

async function update(req, res, next){
  console.log(req.body)
  const updatedReview = { ...req.body.data, review_id:res.locals.review.review_id} 
  console.log(updatedReview)
  reviewsService 
    .update(updatedReview)
    .then(async (data)=> {
        //if (data){
          const c = await reviewsService.getCriticForReview(data)
          console.log(data, c)
          const dataReduced = reduceCritics([c])
          console.log(dataReduced)
          res.json({data:dataReduced[0]})
        //}
          //else next({status:400, message:'Not Found'})
      })
    .catch(next)
}

async function destroy(req, res, next){
  reviewsService.delete(res.locals.review.review_id)
    .then( ()=>res.sendStatus(204))
    .catch(next)
}

module.exports = {
  list,
  read:[reviewExists, read],
  update:[reviewExists, update],
  delete:[reviewExists, destroy]
}