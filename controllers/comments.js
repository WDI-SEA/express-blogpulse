let express = require('express')
let router = express.Router()
let db = require('../models')

router.post('/', (req, res)=>{
	console.log(req.body)
	db.comment.create(req.body)
	.then((createdReview)=>{
		res.redirect('/articles/' + req.body.articleId)
	})
	.catch((err)=>{
		console.log('Error in POST /articles', err)
		// res.render('404')
	})
})

module.exports = router