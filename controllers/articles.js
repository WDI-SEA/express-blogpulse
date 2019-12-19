let async = require('async')
let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /articles - create a new post and get redirected to all articles
router.post('/', function(req, res) {
  let tags = []
  if (req.body.tags) {
    tags = req.body.tags.split(',')
  }
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then( article => {
    if (tags.length) {
      //MORE BETTER SOLN!

      //async.forEach(arr, each function, done)
      //each function (item, cb)

      async.forEach(tags, (t, done) => {
        console.log('each')
        db.tag.findOrCreate({
          where: { content: t.trim() }
        })
        .then(([tag, wasCreated]) => {
          console.log('created tag', tag.content)
          article.addTag(tag) //article.addTag, add and model name -- <model1>.add<model2>
          .then(() => {
            console.log('added tag to table')
            done()
          })
          .catch(function(error) {
            console.log('failed adding to join')
            res.status(400).render('main/404')
            done()
          }) //end of adding to join table
        })
        .catch(function(error) {
          console.log('find or create error')
          res.status(400).render('main/404')
          done()
        })
      }, () => {
        //executes one time only when entire list is complete (all done functions have been called for each iteration)
        console.log('done')
        res.redirect('/articles/' + article.id)
      })

      // console.log('tags was not empty')
      // //create new tags
      // tags.forEach( t => {
      //   db.tag.findOrCreate({
      //     where: { content: t.trim() }
      //   })
      //   .then(([tag, wasCreated]) => {
      //     console.log('created tag', tag.content)
      //     article.addTag(tag) //article.addTag, add and model name -- <model1>.add<model2>
      //     .then(() => {
      //       console.log('added tag to table')
      //     })
      //     .catch(function(error) {
      //       console.log('failed adding to join')
      //       res.status(400).render('main/404')
      //     }) //end of adding to join table
      //   })
      //   .catch(function(error) {
      //     console.log('find or create error')
      //     res.status(400).render('main/404')
      //   }) //end of finding or creating tag
      // })//End of for each loop
    } else {//End of if
      res.redirect('/articles/' + article.id)
    }
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

// GET /articles/:id - display a specific post and its author
router.get('/:id', function(req, res) {
  db.article.findOne({
    where: { id: req.params.id },
    include: [ db.author, db.comment, db.tag ]
  })
  .then(function(article) {
    if (!article) throw Error()
    console.log(article)
    res.render('articles/show', { article })
  })
  .catch(function(error) {
    console.log(error)
    res.status(400).render('main/404')
  })
})

module.exports = router
