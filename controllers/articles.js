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
    if (!article) throw Error() //(backend error)node Error(), can be used to extend a class of different types of errors to run
    console.log(article.author)
    res.render('articles/show', { article: article }) //works here because it gets sent a request and respond
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

//POST /articles/:id/comments to add
router.post('/:id/comments', (req, res) => {
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    articleId: req.params.id
    // where: { id: req.params.id },
    // include: [db.author, db.comment]
  })
  .then((resPost) => {
    res.redirect(`/articles/${req.params.id}`) //res.redirect not res.render because redirect runs the logic of the function above res.render(JUST SHOWS HTML) res.render(GETS DATA, RUNS ROUTE, DISPLAY DATA)
  })
  .catch((error) => {
    res.status(404).render('main/404')
  })
})
//GET comments from form in show.ejs 


module.exports = router
