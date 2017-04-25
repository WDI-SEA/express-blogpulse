// Then, run the migration for the model and test the model's functionality.
var db = require('./models');

db.comment.create({
    name: 'Paul Allen',
    content: 'This is really neat! Thanks for posting.',
    postId: 1
}).then(function(comment) {
    console.log(comment.get());
});


// Be sure to also test querying comments off of posts, which should verify that the association exists.
//Here's an example, once you've created a comment:
db.post.find({
    where: { id: 1 },
    include: [db.comment]
}).then(function(post) {
    // by using eager loading, the post model should have a comments key
    console.log(post.comments);
});
