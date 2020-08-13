let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /comments
router.post('/', (req, res) => {
    db.comment.create({
      commentator: req.body.commentator,
      commentContent: req.body.commentContent,
      articleId: req.params.id
    })
    .then((post) => {
      res.redirect('/')
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })

module.exports = router