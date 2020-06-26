let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /articles - create a new post
router.post('/', (req, res) => {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/new - display form for creating new articles
router.get('/new', (req, res) => {
  db.author.findAll()
  .then((authors) => {
    res.render('articles/new', { author: authors })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/:id - display a specific post and its author
router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author, db.comment]
  })
  .then((article) => {
    if (!article) throw Error()
    console.log(article.comment)
    // console.log(`2nd`, article.comments[1].dataValues)
    res.render('articles/show', { article: article, id: req.params.id })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

router.post('/:id/comment', (req, res) => {
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    articleId: req.params.id
  }).then(function(post) {
    // console.log(`🎆`)
    // console.log(updated)
    res.redirect(`/articles/${req.params.id}`)
  }).catch((error) => {
    console.log(error)
  })
})


module.exports = router
