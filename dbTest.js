// var db = require('./models')

// db.comment.create({
//   name: 'Burger King Guy',
//   content: 'It is so hard to ride my bike with these TINY hands.',
//   articleId: 1
// }).then(function(comment) {
//   console.log(comment.get())
// })

// var db = require('./models')

// db.article.findOne({
//   where: {id: 1}, 
//   include: [db.comment]
// }).then(function(article) {
//   console.log(article.comments)
// })

// //POST /articles/:id/comments -- receive the data from the form & render it on article's page
// router.post('/:id/comments', (req, res) => {
//   db.comment.create({
//     name: req.body.name, 
//     content: req.body.content
//   }).then(newComment => {
//     res.render('/:id/show')
//   }).catch(error)
