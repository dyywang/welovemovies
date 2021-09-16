const router = require("express").Router()
const controller = require("./reviews.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")
const app = require("../app")

/*
router
  .route("/")
  .get(controller.list)
*/

router
  .route("/:reviewId")
  //.get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed)

module.exports = router
