let db = require('./models')

// db.comment.create({
//     name: 'Some Dude',
//     content: 'Great article, so interesting!',
//     articleId: 1
// })
// .then(comment => {
//     console.log(comment.get())
// })

db.article.findOne({
    where: { id: 1 },
    include: [db.comment]
}).then(function(article) {
    // by using eager loading, the article model should have a comments key
    console.log(article.comments[0].name)
})