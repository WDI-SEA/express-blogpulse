var db = require('./models');



app.post('/post/:id', function(req, res){

db.comment.create({
name: 'Paul Allen',
content: 'This is really neat! Thanks for posting.',
postId: 1
}).then(function(comment) {
console.log(comment.get());
})
