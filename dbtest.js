const db = require('./models')

db.comment.create({
  name: 'Patrick Nash',
  comment: 'I do not approve of bike lanes.',
  articleId: 1
}).then(comment =>{
  console.log(comment)
  process.exit()
})

db.article.findOne({
  where: {id: 1}, 
  include: [db.comment]
}).then(article =>{
  console.log(article.comments)
})