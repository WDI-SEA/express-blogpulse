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
// ('/:id') already in articles and its parameter is :id i find it in where {id:req.params.id}
router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author, db.comment],
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

// router.get('/:id', (req, res)=>{
//   db.comment.findOne({
//     where: {id: req.params.id}
//     // include: [db.article]
//   })
//  .then(comment =>{
//    console.log(comment.project)
//    res.redirect('articles')
//  })
//  .catch(err =>{
//    console.log('ERRrrrrrrRRRRRRRRRRORRRRRRRRR', err)
//  })
// })




// router.get('/', (req, res)=>{
//   db.category.findAll()
//   .then(categories =>{
//       res.render('categories/index', {categories:categories})
//   }).catch(err =>{console.log(err)})
// })
module.exports = router
