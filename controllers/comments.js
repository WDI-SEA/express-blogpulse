let express = require('express')
let db = require('../models')
let router = express.Router()

router.post("/",(req,res)=>{
  let id;
    async function add(){
       id= parseInt(req.body.articleId)
 const article = await db.article.findOne({where: id})
   const addComment = await article.createComment({
    name:req.body.commName,
    content:req.body.com
   })
    }
    add().then(
      res.redirect(`/articles/${id}`)
    )
   
})
module.exports=router