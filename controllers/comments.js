let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /comments/new - display form for creating new comments
router.get('/new', (req, res) => {
    res.render('comments/new.ejs')
  })

// POST /comments - create a new comment
router.post('/', (req, res) => {
    db.comment.create({
      name: req.body.name,
      content: req.body.content,
    })
    .then((post) => {
      res.redirect('/')
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })


module.exports = router
