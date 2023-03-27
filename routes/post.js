const express=require('express');
const router=express.Router();
const PostController=require('../controllers/posts_controller');
const passport=require('passport');

console.log('Hi Bhavesh We At Post Routs Pass It >>>>>>>>>>>>');
//add aaaaaauth
router.post('/create/:id',PostController.Create);
router.get('/destroy/:id',passport.checkAuthentication,PostController.Destroy);
router.post('/createpic/:id',passport.checkAuthentication,PostController.UploadPic);

module.exports=router;