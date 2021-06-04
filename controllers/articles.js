let express = require('express')
let db = require('../models')
const comment = require('../models/comment')
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
    res.render('articles/show', { article: article})
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})


router.post('/:id/comments', (req, res) => {
  db.comment.create({
  name: req.body.comName,
  content: req.body.comContent,
  articleId: req.params.id
  })
  .then((resPost) => {
    console.log('new comment ✅')
    res.redirect(`/articles/${req.params.id}`)
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})




module.exports = router
