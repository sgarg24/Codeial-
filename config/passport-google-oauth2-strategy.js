const passport=require('passport');
const googleStrategy =require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:"689879205113-vr58d5jvt1l7lmrt56otakjp49n83gpn.apps.googleusercontent.com",
    clientSecret:"qto8pS7ohfE6tLaX_mCrEyNt",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
},

function(accessToken,refreshToken,profile,done){
    //find a user           //user have more than one emails
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
         if(err){console.log("error in google strategy-passport",err);return;}

         
         console.log(profile);

         if(user){
             //if found ,set this user as req.user
             return done(null,user);
         }else{
             //if not found,create the user and set it as req.user 
             User.create({
                 name:profile.displayName,
                 email:profile.emails[0].value,
                 password:crypto.randomBytes(20).toString('hex')
             },function(err,user){
                if(err){console.log("error in creating user google strategy-passport",err);return;}

                return done(null,user);
             });
         }
    });
}

));
module.exports=passport;
