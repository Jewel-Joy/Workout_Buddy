const express=require('express');
const router=express.Router();
const {loginUser,signUpUser}=require('../Controller/userController');
router.post('/login',loginUser);

router.post('/signup',signUpUser);

module.exports=router;