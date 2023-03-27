const { render } = require('ejs');
const { findById } = require('../models/user');
const User = require('../models/user');
const { FriendToggle } = require('./friendship_controller');
const PostPhoto = require('../models/postpic');
const profile = async (req, res) => {

    console.log("hI Bhavesh Sir Users=>Profile Loaded SuccessFully.......", req.params.id);

    // User.findById(req.params.id,(err,userData)=>{

    //     if(err){
    //         console.log("Error in  Find Id in ProfileX xxxxxx xxxxxxxx ");
    //         return;
    //     }


    //     res.render('user_profile',{
    //         title:'Profile',
    //         user:userData
    //     })
    // })


    try {


        const userData = await User.findById(req.params.id)
            .populate({
                path: 'relations',
                populate: {
                    path: 'from_user',
                }
            })
            .populate({
                path: 'friends',
                populate: {
                    path: 'from_user'
                },
            })
            .populate({
                path: 'friends',
                populate: {
                    path: 'to_user'
                },
            })
        
        userVal=await User.findById(req.params.id);

        

        console.log('Hi Bhavesh User Profiles Data: ', userData);

        const photoData = await PostPhoto.find({ user: req.params.id });
        console.log('Hi Bhavesh Sir Photos=>+>=> : ', photoData);

        res.render('user_profile', {
            title: 'Profile',
            user: userData,
            photos: photoData
        })

    }
    catch (err) {
        console.log("Error in  Find Id in ProfileX xxxxxx xxxxxxxx ", err);
    }

}
module.exports.profile = profile;


const SignUp = (req, res) => {

    return res.render('sign-up');
}
module.exports.SignUp = SignUp;


const SignIn = (req, res) => {

    return res.render('sign-in');
}
module.exports.SignIn = SignIn;


const UserCreate = async (req, res) => {

    //   console.log("data: ",req.body);
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            about: req.body.about,
            cfname: req.body.cfname,
            cfData:{},
            cfRating:0
        });
        console.log('Hi Bhavesh Sir user Created SuccessFully........', user);
        return res.redirect('/');
    }
    catch (err) {
        console.log('Error In Created user: xxxxxxxxxx xxxxxxxx xxxxxxxxxxx', err);
        return res.render('sign-up');
    }

}
module.exports.UserCreate = UserCreate;


const CreateSession = (req, res) => {
       
    
    console.log('Hi Bhavesh Sir Session is Created by Passport SuccessFully.................');

    return res.redirect('/');

}
module.exports.CreateSession = CreateSession;


const DestroySession = (req, res) => {

    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        console.log("Hi Bhavesh Sir Log Out SuccessFully");
        res.redirect('/');
    });



}
module.exports.DestroySession = DestroySession;

const UpdateForm = async (req, res) => {
    try {

        console.log('Hi Bhavesh Upadate UserId :', req.params.id);

        user_val = await User.findById(req.params.id);

        if (req.params.id == user_val.id) {
            console.log('Hi Upadate User Data: ', user_val);

            return res.render('user_updateForm', {
                title: 'UpadateForm',
                user: user_val
            })
        }
        else {
            return res.redirect('back');
        }

    }
    catch (err) {
        console.log('Error in Get Updated From xxxxx xxxxxx xxxxxxxx ', err);
    }
}
module.exports.UpdateForm = UpdateForm;


const UpdateData = async (req, res) => {

    try {

        const valId = req.params.id
        console.log('User name: Bosdy=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', req.body);
        const user = await User.findById(req.params.id);

        console.log('User name: ok ', user);
        if (req.params.id == user.id) {

            console.log('Hi Bhavesh Sir ans======>', req.body.name)
            const update_val = await User.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                email: req.body.email
            });
            console.log('HI Bro', update_val)

            User.updateAvatar(req, res, function () {


                console.log('Bhavesh Sir Pic File: ', req.file);

                if (req.file) {
                    user.avatar = User.AvatarPath + '/' + req.file.filename;
                }

                user.save();
                console.log('Hi Bhavesh Update SuccessFully');

                return res.redirect('/');
            })



        }
        else {
            console.log('Wrong Person');
            return res.redirect('/');
        }
    }
    catch (err) {
        console.log('Error in UpdateData :xxx xxxxxxxxx xxxxxxxxx', err);
    }
}
module.exports.UpdateData = UpdateData;




const Updatepic = async (req, res) => {

    try {


        const user = await User.findById(req.params.id);

        console.log('User name: ok uuuuuuuuuuuppppppppppppddddddddddddaaaaaaaatttttteeeee ', user);
        if (req.params.id == user.id) {


            User.updateAvatar(req, res, function () {


                console.log('Bhavesh Sir Pic File: ', req.file);

                if (req.file) {
                    user.avatar = User.AvatarPath + '/' + req.file.filename;
                }

                user.save();
                console.log('Hi Bhavesh Update SuccessFully');

                return res.redirect('/users/updateform/' + req.params.id);
            })



        }
        else {
            console.log('Wrong Person');
            return res.redirect('/');
        }
    }
    catch (err) {
        console.log('Error in UpdateData :xxx xxxxxxxxx xxxxxxxxx', err);
    }
}
module.exports.Updatepic = Updatepic;