const db = require('./models')

//create comment
// db.comment.create({
//     name: 'Patrick Star',
//     content: 'Who lives in a pineapple under the sea',
//     articleId: 2
// })
// .then( comment => {
//     console.log(comment.get())
// })

//or this
// db.article.findOne({
//     where: { id: 2 },
//     include: [db.comment]
// })
// .then(foundArticle => {
//     foundArticle.createComment({
//         name: 'SpongeBob',
//         content: 'I live in a pineapple under the sea...',
//     })
//     .then(createdComment=>{
//         console.log(createdComment.get())
//     })
// })


// see comments for 1
// db.article.findOne({
//     where: { id: 1 },
//     include: [db.comment]
//   }).then(function(article) {
//     // by using eager loading, the article model should have a comments key
//     console.log(article.comments)
//   })


//find all comments
db.article.findOne({
    where: {id: 1},
    include: [db.comment]
})
.then(article=>{
    article.comments.forEach(comment=>{
        console.log(comment.get())
    })
})