const express=require('express');

const router=express.Router();

const post_controller=require('../controllers/post_controller');

router.get('/',post_controller.post);

module.exports=router;