const express=require('express');
const router=express.Router();
const CommentController=require('../controllers/comments_controller');
const passport=require('passport');

console.log('Hi Bhavesh We At Post Routs Pass It >>>>>>>>>>>>');
router.post('/create',passport.checkAuthentication,CommentController.Create);
router.get('/destroy/:id',passport.checkAuthentication,CommentController.Destroy);
module.exports=router;