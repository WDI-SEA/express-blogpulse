let express = require('express')
let db = require('../models')
const comment = require('../models/comment')
const article = require('../models/article')
let router = express.Router()

// POST /comments
router.post('/', (req, res) => {
    db.comment.create({
      commentator: req.body.commentator,
      commentContent: req.body.commentContent,
      articleId: req.body.articleId
    })
    .then((post) => {
      res.redirect(`/articles/${req.body.articleId}`)
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })

module.exports = router