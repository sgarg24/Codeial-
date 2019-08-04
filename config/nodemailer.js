const nodemailer = require('nodemailer');
const ejs=require('ejs');
const path=require('path');


let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'alchemy.cn18',
        password:'codingninjas'
    }
});

//we will be using ejs and we will be using the template rendering engine
let renderTemplate = (data, relativePath) =>{//relative path is from the mail is being sent
    let mailHTML;
    ejs.renderFile(
       path.join(__dirname,'../views/mailers',relativePath),
       data,
       function(err,template){
           if(err){console.log('error in rendering template');return;}
           mailHTML=template;
       }
    )

    return mailHTML;
}

module.exports={
    transporter : transporter,
    renderTemplate:renderTemplate
}
