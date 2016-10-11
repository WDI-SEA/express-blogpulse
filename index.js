var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var moment = require('moment');
var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));
/* middleware that allows us to access the 'moment' library
 * in every single EJS view, without having to define it
 */
app.use(function(req, res, next) {
  res.locals.moment = moment;
  next();
});

// GET / - display all posts and their authors
app.get('/', function(req, res) {
  db.post.findAll({
    include: [db.author]
  })
  .then(function(posts) {
    res.render('main/index', { posts: posts });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// bring in authors and posts controllers
app.use('/authors', require('./controllers/authors'));
app.use('/posts', require('./controllers/posts'));
// app.use('/comments', require('./controllers/comments'));


// app.get("/posts/:id", function(req, res){
//   db.comment.create({
//     name: req.body.post.name,
//     content: req.body.post.content,
//     postId: req.body.post.postId
//   })
//   console.log("test");
// });





// app.get('/posts/:id', function(req, res){
//   db.comment.create({
//     name: req.body.name,
//     content: req.body.content,
//     postId: req.body.postId
//   })
//   .then(function(comment) {
//     res.redirect('/');
//   })
// });










var server = app.listen(process.env.PORT || 3000);

module.exports = server;
