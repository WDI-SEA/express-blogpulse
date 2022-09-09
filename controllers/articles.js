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
    res.send(error)
  })
})

// GET /articles/new - display form for creating new articles
router.get('/new', (req, res) => {
  db.author.findAll()
  .then((authors) => {
    console.log(authors)
    res.render('articles/new', { authors: authors })
  })
  .catch((error) => {
    res.send('error')
  })
})

// GET /articles/:id - display a specific post and its author
router.get('/:id', async (req, res) => {
  await db.article.findOne({
    where: { id: req.params.id },
    include: [db.author]
  })
  .then((article) => {
    console.log(article.author)
    res.render('show.ejs', { article: article })
  })
  .catch((error) => {
    console.log(error)
    res.send('error')
  })
})
router.post('/:id', async (req, res) => {
  await db.comment.create({
    name: req.body.name,
    content: req.body.content,
    articleId: req.params.id
  })
  .then((comment) => {
    res.redirect(`/articles/${req.params.id}`)
    res.send('comment created')
    res.send(comment)
  })
  .catch((error) => {
    res.send(error)
  })
})
module.exports = router
