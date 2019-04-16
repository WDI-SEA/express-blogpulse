let express = require('express')
let db = require('../models')
let router = express.Router()

router.post('/', (req, res) => {
	// res.send(req.body)
	req.body.name = req.body.name || 'Anonymous User'
	db.comment.create(req.body)
	.then((createdComment) => {
		res.redirect('/articles/' + req.body.articleId)
	})
	.catch((error) => {
		console.log('Error in POST /comments', error)
		res.send('404')
	})
})

module.exports = router