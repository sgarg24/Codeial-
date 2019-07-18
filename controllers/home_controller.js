const Post = require('../models/post');

module.exports.home = function(req, res){
    // populate the user of each post
    Post.find({}).populate('user').exec(function(err, posts){
        console.log(posts.user);
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    });

}

// module.exports.actionName = function(req, res){}