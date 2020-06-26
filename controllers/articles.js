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
    include: [db.author, db.comments] // see comments here 
  })
  .then((article) => {
    if (!article) throw Error()
    console.log(article.author)
    res.render('articles/show', { article: article })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

// POST /articles/:id/comments - add a NEW Comment in the params ------------

router.post('/:id/comments', (req, res) => {
  let id = req.params.id
  db.comments.create({
    name: req.body.name,
    content:req.body.content,
    articleId: req.params.id
  })
  .then((comments => {
    res.redirect(`/articles/ ${req.params.id}`)
  }))
})

// router.post('/comments/:id', (req, res) => {
//   db.comments.create({
//     name: req.body.nameComment,
//     content: req.body.nameComment
//     articleId: req.body.articleId
//   })
//     .then((post) => {
//     res.redirect('/')
//   })
//   .catch((error) => {
//     res.status(400).render('main/404')
//   })
//   return comments;
// })




module.exports = router
