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
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})
  
  // GET articles/:id/edit to display a form to edit an article
router.get('/:id/edit', async (req, res) => {
    try {
      const article = await db.article.findByPk(req.params.id)
      res.render('articles/edit.ejs', { article })
    } catch(error) {
      console.log(error)
      res.status(400).render('main/404')
    }
})

// PUT articles/:id to UPDATE article
router.put('/:id', async (req, res) => {
  try {
    await db.article.update(req.body, {
      where: {id: req.params.id}})

    res.redirect(`/articles/${req.params.id}`)
  } catch(error) {
    console.log(error)
    res.status(400).render('main/404')
  }
})

// POST articles/:id/comments to create new comments
router.post('/:id/comments', async (req, res) => {
  try {
    const newComment = {
      name: req.body.name,
      content: req.body.content,
      articleId: req.params.id
    }
    await db.comment.create(newComment)
    res.redirect(`/articles/${req.params.id}`)
  } catch(error) {
    console.log(error)
    res.status(400).render('main/404')
  }
})

module.exports = router
