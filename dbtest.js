const db = require('./models')

db.comment.create({
    name: 'Patrick Star',
    content: 'Who lives in a pineapple under the sea',
    articleId: 2
})
.then( comment => {
    console.log(comment.get())
})

// db.article.findOne({
//     where: { id: 1 },
//     include: [db.comment]
//   }).then(function(article) {
//     // by using eager loading, the article model should have a comments key
//     console.log(article.comments)
//   })