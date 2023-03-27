//routr for users
const express=require('express');
const router=express.Router();
const passport=require('passport');

console.log("Hi Bhavesh Sir Users Rout Loaded ....");
const UsersController=require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication,UsersController.profile);
router.get('/sign-up',UsersController.SignUp);
router.get('/sign-in',UsersController.SignIn);
router.post('/create',UsersController.UserCreate);
//
//router.post('/create-session',passport.authenticate('local',{failureRedirect:'/'}),UsersController.CreateSession);
router.post("/create-session",passport.authenticate(
    'local',
    {failureRedirect:"/users/sign-up"},
    ),UsersController.CreateSession);
router.get('/sign-out',UsersController.DestroySession);
router.get('/updateform/:id',UsersController.UpdateForm);


router.post('/updateData/:id',UsersController.UpdateData);
router.post('/updatepic/:id',UsersController.Updatepic);
module.exports=router;