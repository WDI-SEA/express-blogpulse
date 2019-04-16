var express = require('express')
var db = require('../models')
var router = express.Router()

router.post('/',(req,res) => {
  //res.send(req.body)
    db.comment.create(req.body)
     .then((createdComment) =>{
    res.redirect('/articles/' + req.body.articleId)
  })
  .catch((err)=>{
    console.log('error in post review', err)
    res.render('404')
     })
  })


module.exports = router
