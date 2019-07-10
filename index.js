const express=require('express');
const cookieParser=require('cookie-parser');
const path=require('path');
const app=express();
const port = 8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport =require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up the view engine...!!
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(session({
 name:'codeial',
 //TODO change the secret before deployment in production mode
 secret:'blahsomething',//this only key is used to encrypt the cookie
 saveUninitialized:false,
 resave:false,
 cookie:{
     maxAge: (1000*60*100)
 },
 store:new MongoStore(
     {
     mongooseConnection:db,
     autoRemove:'disabled'
     },
   function(err){
       console.log(err || 'connect-mongodb setup ok');
     }
 )
 }));
//we need to tell the app to use passport
app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser); //this is the same name of the function ..


//use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server : ${err}`);
    }
   console.log(`Server is running on port : ${port}`);
});
