var db = require('../models');

db.comment.create({
	name: 'Sarah Dudley',
	content: 'Spiders suck',
	postId: 1
})
.then((comment) => {
	console.log(comment.get());
})
.catch((err) => {
	console.log('Comment by Adam not created.', err)
})