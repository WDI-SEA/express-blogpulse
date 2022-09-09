let express = require('express')
let db = require('../models')
const comment = require('../models/comment')
let router = express.Router()

router.get("/", async (req,res)=>{
    const comment = await db.comment.findAll()
    console.log(comment)
    res.render("comments/show",{comments:comment})
})

router.post("/",async (req,res)=>{
    console.log(req.body)
    const comment = await db.comment.create({
        name: req.body.userName,
        content:req.body.comment,
        articleId:req.body.articleId
    })
    res.redirect("/comments")
})

module.exports = router

