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

// POST for /:id/comments
router.post('/:id/comments', function(req, res) {
  //receive the comment and add to the db
  console.log(req.body);
  console.log("This is the full req.body right above");
  db.comment.create({
    name: req.body.name,
    content: req.body.comment,
    articleId: req.params.id
  }).then(function(comment) {
    console.log(comment.articleId);
    console.log("that should be the id directly above");
    res.redirect(`.`);
  });
});

// GET /articles/edit/:id - display a populated form to edit an article
router.get('/edit/:id', function(req, res) {
  db.article.findOne({
    where: {
      id: req.params.id
    }, include: [db.author]
  }).then(article => {
    // res.send('This should send')
    res.render(`articles/edit`, { article: article })
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
    console.log("show db.comment below")
    console.log(article.dataValues.comments)
    res.render('articles/show', { article: article })
  })
  .catch(function(error) {
    console.log(error)
    res.status(400).render('main/404')
  })
})


// PUT /articles/:id - updating an article
router.put('/:id', function(req, res) {
  // console.log(req.params.id)
  db.article.update(
    {
      title: req.body.title,
      content: req.body.content,
      authorId: req.body.author
    },{
    where: { id: req.params.id }
  })
  .then(function(article) {
    db.article.findOne({
      where: { id: req.params.id },
      include: [db.author, db.comment]
    }).then(function(article) {
        if (!article) throw Error()
        // console.log("show db.comment below")
        // console.log(article.dataValues.comments)
        res.render('articles/show', { article: article })
      })
      .catch(function(error) {
        console.log(error)
        res.status(400).render('main/404')
      })
  })
})


module.exports = router
