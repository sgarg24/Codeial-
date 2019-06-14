const express=require('express');

const router=express.Router();
const homeController=require('../controllers/home_controller');

console.log('router loaded!');
//get access of controller
//this router access the index router..
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/post',require('./post'));
module.exports=router;

