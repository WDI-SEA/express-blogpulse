let express = require('express')
let db = require('../models')
let router = express.Router()

router.post("/",(req,res)=>{
    async function add(){
 const article = await db.article.findOne({where:req.query.articleId})
   const addComment = await article.createComment({
    name:req.body.commName,
    content:req.body.com
   })
    }
    add();
   
})
module.exports=router