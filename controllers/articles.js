let express = require('express')
let db = require('../models')
let async = require('async')
let router = express.Router()

// POST /articles - create a new post
router.post('/', (req, res) => {
  let tags = req.body.tags.split(",")
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then(article => {
    async.forEach(tags, (tag, done) => {
      console.log(tag)
      db.tag.findOrCreate({
        where: { name: tag }
      })
        .then(([tag, wasCreated]) => {
          article.addTag(tag)
            .then(() => {
              // loop back
              console.log('done adding', tag)
              done()
            })
        })
    }, () => {
      res.redirect('/')
    })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// POST /:id - creates a comment
router.post('/:id', (req, res) => {
  db.comment.create({
    name: req.body.name,
    context: req.body.context,
    articleId: req.params.id
  })
    .then(() => {
      res.redirect(`/articles/${req.params.id}`)
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
    include: [db.author,db.comment,db.tag]
  })
  .then((article) => {
    if (!article) throw Error()
    console.log(article.author)
    console.log(article.comments)
    res.render('articles/show', { article: article })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

module.exports = router
