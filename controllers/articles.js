let express = require('express')
let db = require('../models')
const article = require('../models/article')
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

// POST /comment - create a comment in a specific
router.post('/comment/:id', (req, res) => {
  db.article.findOne({
    where: {id: req.params.id},
    include: [db.author, db.comment]
  }).then(article =>{
    article.createComment({
      name: req.body.name,
      content: req.body.content,
      articleId: req.params.id
    }).then(comment =>{
      res.redirect(`/articles/${req.params.id}`)
    })
  })
})

// To edit a specific article
router.put("/:id", (req,res)=>{
  console.log(res)
  db.article.update({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId},
    {
      where: {id: req.params.id}
  }).then(articleChanged =>{
    res.redirect('/')
})
})

// To delete a specific article
router.delete("/:id", (req,res)=>{
 db.article.destroy({
   where: {id: req.params.id}
 }).then(articleDeleted =>{
   res.redirect('/')
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

// GET / - display a specific article
router.get('/edit/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author]
  }).then((article) => {
    article.getAuthor().then(author =>{
      res.render('articles/edit', { article:article, author:author})
    })     
  }).catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

// GET /articles/:id - display a specific post and its author
router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author,db.comment]
  })
  .then((article) => {
    if (!article) throw Error()
    article.getComments().then(comments =>{
      res.render('articles/show', { article: article, comments:comments})
    })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})



module.exports = router
