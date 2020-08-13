let express = require("express");
let db = require("../models");
let router = express.Router();


router.post('/articles', (req, res)=> {
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    articleId: req.body.articleId
  })
  .then(comment => {
    res.redirect('/articles/' + req.body.articleId)
  })
  .catch((err) => {
    console.log(err)
    res.send('This is an error')
  })
})

module.exports = router;
