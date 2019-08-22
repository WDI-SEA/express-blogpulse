const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", (req, res) => {
	db.article.findByPk(req.body.articleId)
	.then(article => {
		db.tag.findOrCreate({
			where: {
				name: req.body.name
			},
			defaults: {
				name: req.body.name.toLowerCase()
			}
		})
		.spread((tag, created) => {
			if (created) {
				article.addTag(tag)
				.then(tag => {
					res.redirect(`/articles/${article.id}`);
				})
			} else {
				res.redirect(`/articles/${article.id}`);
			}
		})
	})
	.catch(err => {
		console.log(err);
	})
})

router.get("/:id", (req, res) => {
	db.tag.findByPk(req.params.id, {
		include: [db.article]
	})
	.then((tag) => {
		res.render("tags/show", { tag });
	})
	.catch(err => {
		console.log(err);
	})
})

module.exports = router;