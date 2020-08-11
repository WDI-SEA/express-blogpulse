const db = require('./models')
db.article.findOne()
.then(foundArticle=>{
    foundArticle.createComment({
        name: 'Adam',
        content: 'I listened to a beach tune this morning'
    })
    .then(createdComment=>{
        console.log(createdComment.get())
    })
})
// db.article.findOne({
//     where: {id: 1},
//     include: [db.comment]
// })
// .then(article=>{
//     article.comments.forEach(comment=>{
//         console.log(comment.get())
//     })
// })