var db = require('./models');
/*db.comment.create({
    name: 'Paul Allen',
    content: 'This is also really neat! Thanks for posting.',
    postId: 1
}).then(function(comment) {
    console.log('one', comment.get());
});
*/


db.post.find({
    where: { id: 1 },
    include: [db.comment]
}).then(function(post) {
    // by using eager loading, the post model should have a comments key
    console.log("two", post.comments[1].content);
});
