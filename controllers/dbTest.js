var express = require('express')
var db = require('../models')
var router = express.Router()

db.comment.create({
  name: 'Paul Allen',
  content: 'This is really neat! Thanks for posting.',
  articleId: 1
})
.then(function(comment) {
  console.log(comment.get())
})