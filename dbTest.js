var db = require('./models');

// create a post ...
db.post.find({
    name: 'What I Like About You',
    where: '404 not found',
    postId: 1
}).then(function(post) {
    console.log('post', post());

    // create a comment on that post ...
    db.post.create.Comment({
        name: 'Paul Allen',
        content: 'This is really neat! Thanks for posting.',
        postId: 1
    }).then(function(comment) {
        console.log('comment', comment());
    });
});
