var express = require('express')
var db = require('../models')
var router = express.Router()


router.post('/:id', (req,res) => {
  // Make sure the name has a value 
  req.body.name = req.body.name || 'Anonoymouus User'

  //Create comment
  db.comment.create(req.body)
  .then((createdComment) => {
    res.redirect('/article/comment/:id')
  })
  .catch((err) => {
    console.log('Error in POST /comments', err)
    res.render('404')
  })
})

module.exports = router