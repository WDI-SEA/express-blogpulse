db = require('./models')

db.article.findOne({
  where: { id: 1 }
}).then(article => {
  article.createComment({
    name: "Johnny Boi",
    content: "This slaps."
  })
})
