var express = require('express')
var db = require('../models')
var router = express.Router()

// Showing all comments EVER
router.get('/', (req,res) => {
    db.comment.findAll({include: [db.article]})
    .then(comments => res.render('articles/allCom', {comments}))
    .catch(err => {res.render('main/404')})
})
// Posting a comment and attaching it to the article
router.post('/', (req,res) => {
    db.comment.create(req.body)
    .then(() => res.redirect(`/articles/${req.body.articleId}`))
    .catch(err => {res.render('main/404')})
})
module.exports = router