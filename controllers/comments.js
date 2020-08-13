let express = require('express')
let db = require('../models')
let router = express.Router()

// router.get('/:id', (req, res) => {
//     db.article.findOne({
//         where: {
//             id: req.params.id
//         },
//         include: [db.comment]
    
//     })
//     .then(article => {
//         res.render('/', { article: article, comments: article.comments})
//     })
// })

// router.post('/', (req, res) => {
//     db.comment.create({
//        // name, content, articleId
//        name: req.body.comName,
//        content: req.body.comContent,
//        articleId: req.params.id
//     })
//     .then(addComment => {
//         res.redirect('/articles/' + req.params.id)
//     })
//     .catch(error => {
//         console.log('error: ', error)
//     })
// })



module.exports = router