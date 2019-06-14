const express=require('express');
const path=require('path');
const app=express();
const port = 8000;
const expressLayouts=require('express-ejs-layouts');
app.use(express.static('./assets'));
app.use(expressLayouts);
//extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//use express router
app.use('/',require('./routes'));
//set up the view engine...!!
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server : ${err}`);
    }
   console.log(`Server is running on port : ${port}`);
});