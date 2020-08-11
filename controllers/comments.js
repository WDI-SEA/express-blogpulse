let express = require("express");
let db = require("../models");
let router = express.Router();


router.post('/', (req, res)=> {
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    articleId: req.body.articleId
  })
  .then()
})
