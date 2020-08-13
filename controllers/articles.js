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
    include: [db.author]
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

router.get('/:id', (req, res)=>{
  db.comment.findOne({
    where: {id: req.params.id}
    // include: [db.article]
  })
 .then(comment =>{
   console.log(comment.project)
   res.redirect('articles')
 })
 .catch(err =>{
   console.log('ERRrrrrrrRRRRRRRRRRORRRRRRRRR', err)
 })
})







// router.get('/', (req, res)=>{
//   db.category.findAll()
//   .then(categories =>{
//       res.render('categories/index', {categories:categories})
//   }).catch(err =>{console.log(err)})
// })



// router.get('/:id', (req, res) =>{
  //purpose choose a category and find all the projects that assocaied withthat cataogry
  //find with req.params.id from the url
  // db.category.findOne({
  //     where: {id: req.params.id},
  //     include: [db.project]
  // })
//   .then(category =>{
//       //rpove page with category object
//       console.log(category.projects)
//       res.render('categories/show', {category})
//   }).catch(err =>{console.log('error', err)})
// })

// router.post('/', (req, res) =>{

// })





// db.artist.findOrCreate({
//   where: {name: '2pac'},
//   defaults: {city: 'West Coast California', description: 'Poet' }
// })
// .then(([artist, created])=>{
//   console.log(created)
//   db.album.findOrCreate({
//       where: {title: 'All Eyez On Me'},
//       defaults: {year: '1996', genre: 'hip-hop'}
//   })
//   .then(([album, created])=>{
//       console.log(created)
//       artist.addAlbum(album)
//       .then(relationshipInfo =>{
//           console.log(relationshipInfo)
//       })
//       .catch(err =>{
//           console.log('Error', err)
//       })
//   })
//   .catch(err =>{
//       console.log('Error', err)
//   })
// })
// .catch(err =>{
//   console.log('Error', err)
// })
module.exports = router
