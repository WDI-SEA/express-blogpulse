var express = require('express');
var db = require('../models'); //('./modles') may be redundant but . is essential for it to look at a folder, not to find a node module
var router = express.Router();
var async = require('async');

//get all tags
//route get '/tags'
router.get('/', function (req, res) {
	db.tag.findAll().then(function(tags) {
		res.render('tags/allTags', {tags: tags})
	})
})

//get particular tag by id
router.get('/:id', function(req, res) {
	db.tag.findOne({
		where: {id: req.params.id},
		include: [db.post]
	}).then(function(tag) {
		res.render('tags/show', {tag: tag});
	})
})

//edit a particular tag by id


//delete a particular tag by id
router.delete('/:id', function(req, res) {
	db.tag.findOne({
		where: {id: req.params.id},
		include: [db.post]
	}).then(function(tag) {
		//loop through and delete entries in join table -- the postsTags table
		async.forEach(tag.posts, function(p, callback){ //can use '.posts' b/c we included the posts line31
			//Iterator function
			tag.removePost(p); //removes the relationships in the join table
			callback();
		}, function(){
			//function that executes when all callbacks have returned
			//now all relationships deleted, we can remove the actual tags
			db.tag.destroy({
				where: {id: req.params.id}
			}).then(function(deleteTag) {
				res.send('All good');
			})
		}); //end of async call
	})//end of end promise
}) //end of router.delete

//Get edit form
router.get('/:id/edit', function(req, res) {
	db.tag.findById(req.params.id).then(function(tag) {
		res.render('tags/edit', {tag:tag});
	});
})

//edit form
router.put('/:id', function(req, res) {
	db.tag.update({
		name: req.body.name
	}, {
		where: {id: req.params.id}
	}).then(function(tag) {
		res.send('success');
	}).catch(function(err) {
		console.log('ERR', err);
		res.send('sad');
	})
})


module.exports = router;













