var db = require("./models");
// var db = require('./models')
// db.comment.create({
//   name: 'Paul Allen',
//   content: 'This is really neat! Thanks for posting.',
//   articleId: 1
// })
// .then(function(comment) {
//   console.log(comment.get())
// })

// db.article.findOne({
//   where: { id: 1 },
//   include: [db.comment]
// }).then(function(article) {
//   // by using eager loading, the article model should have a comments key
//   console.log(article.comments)
// })

// what I created a comment
// db.comment.create({
//     name: 'Channee Math',
//     content: 'I just want everyone to know, that if I make it, we all gon make it. Real shit',
//     articleId: 2
// })
// .then((comment)=>{
//     console.log(comment.get())
// })
//what i also created is to find my article by id
// db.article.findOne({
//     where: { id: 2 },
//     include: [db.comment]
// })
// .then((article)=>{
//     console.log(article.comments)
// })

// db.article.create({
//     title: 'Long Beach Press Telegram: Eastside Long Beach Native tech sensation comes back to help uplift his community',
//     content: 'Channee Math was the middle child out of 8 siblings, and was no stranger to poverty. His parents escaped the Khmai rouge by heading over to Thailand first, where his 2 oldest brothers even had to eat snake for food to survives as babies. They somehow made it to th United States only to be reintroduced to another world of savage racism and gang culter. This young man has truely seen it all and is now trying to help uplift his own community by creating a non profit tech school and also shops to help those without much. ',
//     authorId: 6
// })
// .then((article)=>{
//     console.log(article.get())
// })

//created my own to find my article by id that I wrote
// db.article.findOne({
//     where: {id: 8},

// })
// .then((article)=>{
//     console.log(article)
// })
// db.author.create({
//     firstName: "Channee",
//     lastName: "Math",
//     bio:
//       "Software Engineer. Father. Husband. Rapper/Producer/Song. Writer Poet.",
//   })
//   .then((authors) => {
//     console.log(authors.get());
//   });

// db.author.findOne({
//     where:{firstName: 'Channee'}
// })
// .then((author) =>{
//     console.log(author)
// })

// db.comment.create({
//     name: 'CM Live',
//     content: 'Write lyrics like a dead poet, dont like socializin but I hope my point is clear so I ant gotta show it, never a failure to fear, but i hope my dreams appear so i can finally make this money and grow it. A future im fine with not knowin, blue city sky blue palm trees cruisin down ocean, that off white 2 door 2000 and 5 integra stay coastin, made it past 16 feelin like I was chosin, no matter how many times I fall, they can never stop a real one from gettin where he goin, Real shit, I hope you forver blessed, and I wish you nothin but success. its Live',
//     articleId: 3
// })
// .then((comment)=>{
//     console.log(comment.get())
// })

// db.article.findOne()
// .then(foundarticle=>{
//     foundarticle.createComment({
//         //and add a comment
//         name: 'Hater guy',
//         content: 'your article really freaken sucks'
//     })
//     .then(createComment =>{
//         console.log(createComment.get())
//     })
// })

db.article.findOne({
    where: {id: 1},
    include: [db.comment]
})
.then(article =>{
    //only apply get to one row of data
   article.comments.forEach(comment =>{
       console.log(comment.get())
   })
})