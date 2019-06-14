const express=require('express');

const router=express.Router();

const users_controller=require('../controllers/users_controller');

router.get('/',users_controller.profile);
router.use('/post',require('./post'));
module.exports=router;