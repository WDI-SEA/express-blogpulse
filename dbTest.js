const db = require('./models')
const article = require('./models/article')
const comment = require('./models/comment')

// db.comment.create({
//   name: 'Paul Allen',
//   content: 'This is really neat! Thanks for posting.',
//   articleId: 1
// })
// .then(function(comment) {
//   console.log(comment.get())
// })
// db.article.findOne({
//     where: { id: 1 },
//     include: [db.comment]
//   }).then(function(article) {
//     // by using eager loading, the article model should have a comments key
//     console.log(article.comments)
//   })
db.article.findOne()
.then(foundArticle =>{
    foundArticle.createComment({
        name: 'Adam ',
        content: 'Your post is sucks!',
})
.then(createComment =>{
    console.log("Created new comment:", createComment.get())
})
})

db.article.findOne({
    where: {id: 1},
    include: [db.comment]
})
.then(article=>{
    article.comments.forEach(comment=>{
        console.log(comment.get())
    })
})
