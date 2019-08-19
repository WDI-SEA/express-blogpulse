
require('dotenv').config();

const express = require('express');
const layouts = require('express-ejs-layouts');
const db = require('./models');
const moment = require('moment');
const rowdy = require('rowdy-logger');
const app = express();

rowdy.begin(app);

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(layouts);
app.use(express.static(__dirname + '/static/'));

// middleware that allows us to access the 'moment' library in every EJS view
app.use((req, res, next) => {
  res.locals.moment = moment
  next()
});

// GET / - display all articles and their authors
app.get('/', (req, res) => {
  db.article.findAll({
    include: [db.author]
  }).then((articles) => {
    res.render('main/index', { articles: articles })
  }).catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  });
});

// bring in authors and articles controllers
app.use('/authors', require('./controllers/authors'));
app.use('/articles', require('./controllers/articles'));

var server = app.listen(process.env.PORT || 3000, () => {
  rowdy.print()
});

module.exports = server;

