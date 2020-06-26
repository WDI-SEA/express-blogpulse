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
  }).then(function(article) {
    //console.log(article)
    if (!article) throw Error()
    res.render('articles/show', { article: article })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

router.post('/:id/comments', (req, res) => {
  //console.log(req.body.text)
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    articleId: req.params.id
  })
  .then(function(article) {
    res.redirect(`/articles/${req.params.id}`)
  })
  .catch(function(error) {
    console.log(error);
    res.status(400).render('main/404')
  })
})



module.exports = router;
