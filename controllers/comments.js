let express = require('express')
let db = require('../models')
let router = express.Router()

router.post('/', (req, res) => {
	db.comment.create(req.body)
	.then(() => {
		res.redirect('articles/show')
	})
	.catch((err) => {
		res.status(400).render('main/404')
	})
})

module.exports = router