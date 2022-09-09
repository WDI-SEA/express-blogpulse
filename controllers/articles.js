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
    include: [db.author]
  })
  .then((article) => {
    if (!article) throw Error()
    db.comment.findAll({
      where: {articleId: req.params.id},
    })
  .then ((comment)=>{
    console.log(comment)
    res.render('articles/show', { article: article, comment:comment  }
    )
  })
    console.log(article.author)
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

// POST /comments -> creates a new comment
router.post ("/:id", async (req, res) =>{
  try{
    const newComment = await db.comment.create
    ({
      name: req.body.name,
      content: req.body.content,
      articleId: req.body.articleId,
    })
    console.log(newComment)
    res.redirect("/")
  }catch(error){
    console.log(error)
    res.send ("server error")
  }
})

module.exports = router
