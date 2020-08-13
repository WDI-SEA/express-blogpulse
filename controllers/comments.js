let express = require('express');
let db = require('../models');
let router = express.Router();

//add new comments
router.post('/', (req, res) => {
  db.comment.create({
     // name, content, articleId
     name: req.body.name,
     content: req.body.content,
     articleId: req.body.articleId
  })
  .then(()=>{
      //go back to article
      res.redirect(`/articles/${req.body.articleId}`)
  })
})
module.exports = router