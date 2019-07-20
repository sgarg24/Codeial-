const Post = require('../models/post');

module.exports.home = function(req, res){
    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        console.log(posts,'----------------');
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    });

}

// module.exports.actionName = function(req, res){}