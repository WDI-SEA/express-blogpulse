let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /comments - create a new comment
router.post('/', (req, res) => {
    db.comment.create({
      name: req.body.name,
      content: req.body.content,
      articleId: req.body.articleId
    })
    .then((post) => {
      res.redirect("/authors")
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })

module.exports = router
