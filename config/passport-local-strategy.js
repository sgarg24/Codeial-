const passport=require('passport');

const LocalStrategy= require('passport-local').Strategy;

const User =require('../models/user');
//authentication using passport
//we need to tell passport to use this local strtegy
passport.use(new  LocalStrategy({
   usernameField :'email'
},
  function(email,password,done){//this function is inbuilt to passport
     //find the user and establish the identity ..
     //import user above
     User.findOne({email:email},function(err,user){//first email is the email of users.js in models folder as a key and the vaule email is the email of function
         if(err){
             console.log('Error in finding the user --> Passport');
              return done(err);
            }

            if(!user || user.password != password){
                    console.log('Invalid username/Password');
                    return done(null,false);
            }
            return done(null,user);
     });
  }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
   done(null,user.id);//this automatically encryps user into the cookie...es serializer function se cookie indes.js(app) me jo middleware hai ..uske through encrypt hogi..
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
 User.findById(id,function(err,user){
           if(err){
            console.log('Error in finding the user --> Passport');
            return done(err);
           }
           return done(null,user);
 });
});


//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){ //i will be using this function as a middleware..
    //if the user is signed in ,then pass on the request to the next function controller's action
    if(req.isAuthenticated()){//this detects whether a user is signedin or not
        return next();
    }
  //if the user is not signed in 
  return res.redirect('/users/sign-in');
}

//set the user for the views
//once the user has signedin then..
passport.setAuthenticatedUser=function(req,res,next){//this is also a middleware
     if(req.isAuthenticated()){
         //req.user contains the current signed in user  for the session cookie and we are just sending it to the locals for the views
         res.locals.user=req.user;//when the user has signed in that users information  is available in req.user (req.user is already handled by passport)
        //but it ijs not sent in to the response locals..i am just transfered it from there
        }
        next();
}

module.exports=passport;