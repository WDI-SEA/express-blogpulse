

// var db = require('./models')

// db.comment.create({
//   name: 'Paul Allen',
//   content: 'This is really neat! Thanks for posting.',
//   articleId: 1
// })
// .then(function(comment) {
//   console.log(comment.get())
// })


var db = require('./models')

db.article.findOne({
    where: { id: 2 },
    include: [db.comment]
})
.then((article)=>{
    console.log(article.comments)
})
// db.article.findOne({
//   where: { id: 1 },
//   include: [db.comment]
// }).then(function(article) {
//   // by using eager loading, the article model should have a comments key
//   console.log(article.comments)
// })

// db.comment.create({
//     name: 'Channee Math',
//     content: 'I just want everyone to know, that if I make it, we all gon make it. Real shit',
//     articleId: 2
// })
// .then((comment)=>{
//     console.log(comment.get())
// })

