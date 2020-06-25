var db = require('./models')


// ---- CREATE A COMMENT -------
db.comment.create({
  name: 'Nesso Forest',
  content: `ummm... Who is 'Paul Allen'?  I'm going for a walk.`,
  articleId: 1
})
.then(function(comment) {
  console.log(comment.get())
})