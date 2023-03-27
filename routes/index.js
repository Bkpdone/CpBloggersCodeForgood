const express=require('express');
const router=express.Router();

//controllers
const HomeController=require('../controllers/home_controller');
console.log('Hi Bhavesh Sir Router is Loaded SuccessFully.....');


//
router.get('/',HomeController.home);

router.use('/users',require('./users'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comment'));
router.use('/likes',require('./like'));
router.use('/friends',require('./friend'));
//Export Router
module.exports=router;
