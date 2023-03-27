const express=require('express');
const router=express.Router();
const FriendshipController=require('../controllers/friendship_controller');
const passport=require('passport');
console.log('Hi Bhavesh Rout Friend')
console.log('Hi Bhavesh We At Like Routs Pass It >>>>>>>>>>>>');
router.get('/toggle',passport.checkAuthentication,FriendshipController.FriendToggle);
router.get('/makefriend',passport.checkAuthentication,FriendshipController.MakeFriend);
router.get('/display',passport.checkAuthentication,FriendshipController.Dispaly_profile);
router.get('/destroy',passport.checkAuthentication,FriendshipController.Remove_Friends);
module.exports=router;