const express = require("express");
const db = require("../models");
const router = express.Router();

// POST /articles/:id/comments - create a new comment
router.post("/", async (req, res) =>
{
    await db.comment.create(req.body);
    res.redirect(`/articles/${req.body.articleId}`);
})

module.exports = router;