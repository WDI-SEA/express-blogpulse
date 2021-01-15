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
    res.render('articles/new', { authors: authors })
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
    console.log(article.author, article.comments)
    res.render('articles/show', { article: article })
    console.log('__________________')
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

//POST comments/:id
router.post('/comments', (req, res) => {
  db.comment.create({
    commenter: req.body.commenter,
    content: req.body.content,
    articleId: req.body.articleId
  })
  .then((post) => {
    res.redirect(`/articles/${req.body.articleId}`)
  })
})

module.exports = router
