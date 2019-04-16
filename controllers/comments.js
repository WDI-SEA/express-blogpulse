let express = require('express')
let db = require('../models')
let router = express.Router()

router.post("/", (req, res) => {
  db.comment.create(req.body)
  .then((createdComment) => {
    console.log(createdComment);
    res.redirect(`/articles/${req.body.articleId}`)})
  .catch((err) => {
    console.log('error while posting comment', err);
  })
})

module.exports = router
