const express=require('express');
const router=express.Router();
const LikeController=require('../controllers/likes_controller');
const passport=require('passport');

console.log('Hi Bhavesh We At Like Routs Pass It >>>>>>>>>>>>');
router.get('/toggle',passport.checkAuthentication,LikeController.Toggle);

module.exports=router;