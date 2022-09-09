const db = require('./models')

db.article.findOne({
  where: { id: 1 },
  include: [db.comment]
}).then(article => {
  // by using eager loading, the article model should have a comments key
  console.log(article.comments)
})

const readArticles = async () => {
  try {
    const article = await db.article.findOne({
      where: { id: 2},
      include: [db.author]
    })
    console.log(article)
  } catch (err) {
    console.log(err)
  }
}

readArticles()