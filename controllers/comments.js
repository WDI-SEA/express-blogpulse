var express = require('express')
var db = require('../models')
var router = express.Router()

router.post('/', (req, res) => {
    db.comment.create(req.body)
    .then(function(newComment) {
        res.redirect('/articles/' + req.body.articleId)
    })
    .catch(function(error) {
        res.status(400).render('main/404')
    })
})

// router.get('/', (req, res) => {
//     db.comment.findAll()
//     .then(function(comment) {
//         res.render('/articles/:id', { comment })
//     })
//     .catch(function(error) {
//         res.status(400).render('main/404')
//     })
// })


// router.get('article/:id', function(req, res) {
//         db.comment.findOne({
//         where: { id: req.params.id },
//         include: [db.comment]
//     })
//     .then(function(comment) {
//         if (!comment) throw Error()
//         console.log(article.author)
//         res.render('articles/:id', { comment: comment })
//     })
//     .catch(function(error) {
//         console.log(error)
//         res.status(400).render('main/404')
//     })
// })

module.exports = router