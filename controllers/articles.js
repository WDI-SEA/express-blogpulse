var express = require('express')
var db = require('../models')
var router = express.Router()

// POST /articles - create a new post
router.post('/', function(req, res) {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then(function(post) {
    res.redirect('/')
  })
  .catch(function(error) {
    res.status(400).render('main/404')
  })
})
router.get('/edit/:id', function(req, res) {
// res.send(req.params);
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author]
  })
  .then(function(article) {
    if (!article) throw Error()
    console.log(article.comments)
    res.render('articles/edit', { article: article })
  })
  .catch(function(error) {
    console.log(error)
    res.status(400).render('main/404')
  })
})
// GET /articles/new - display form for creating new articles
router.get('/new', function(req, res) {
  db.author.findAll()
  .then(function(authors) {
    res.render('articles/new', { authors: authors })
  })
  .catch(function(error) {
    res.status(400).render('main/404')
  })
})

// GET /articles/:id - display a specific post and its author
router.get('/:id', function(req, res) {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author, db.comment]
  })
  .then(function(article) {
    if (!article) throw Error()
    console.log(article.comments)
    res.render('articles/show', { article: article, comments: article.comments })
  })
  .catch(function(error) {
    console.log(error)
    res.status(400).render('main/404')
  })
})

router.post('/edit', (req,res)=>{
  db.article.update({
    id: req.body.id,
    title: req.body.title,
    content: req.body.content
  }, {
    where: {
      id: req.body.id
    }
  }).then(()=>{
    res.redirect(`/articles/${req.body.id}`);
  }).catch((error) => {
    console.log(error);
    res.status(400).render('main/404')
  });
  
});

router.post('/articles/:id/comments', (req,res) => {
  db.comment.create({
    name: req.body.author,
    content: req.body.content,
    articleId: req.params.id
  }).then((response) => {
    res.redirect(`/articles/${req.params.id}`);
  })
});

module.exports = router
