const User = require('../models/user');
const Friendship = require('../models/friendship');
const path = require('path');
const { copyFileSync } = require('fs');
const e = require('express');
const FinalFriendship=require('../models/final_friends');
const ViewerMailer=require('../mailers/viewer_mailer');
const  PostPhoto=require('../models/postpic')
const FriendToggle = async (req, res) => {

    try {
        console.log('Friends Data: ', req.query);
        const FromUser = req.query.From_User;
        const toUser = req.query.To_User;
        console.log('FromUser:', FromUser);
        console.log('toUser', toUser)
        const existingFriend = await Friendship.find({
            $or: [
                { $and: [{ from_user: FromUser }, { to_user: toUser }] },
                { $and: [{ from_user: toUser }, { to_user: FromUser }] }
            ]
        });

        console.log('Check Frienship : ', existingFriend);

        if (existingFriend.length) {
            console.log('HI Bhavesh Friend aahe Dogi');

        }
        else {

            newFriend = await Friendship.create({
                from_user: FromUser,
                to_user: toUser
            });

            const Friend_val = await User.findById(toUser);

            Friend_val.relations.push(newFriend);
            Friend_val.save();
            console.log('Hi Bhavesh Sir New Friendship Make SuccessFully................');

        }

        return res.redirect('/');
    }
    catch (err) {
        console.log('Error In Friendship Controllers : ', err);
    }

}
module.exports.FriendToggle = FriendToggle;


const MakeFriend = async (req, res) => {
    try {
        console.log('Finally Friend are Ready: ', req.query);
        console.log('Uers Id', req.user.id)

        path_val = path.join('./users/profile', req.user.id);
        console.log('path_val: ', path_val);

        const Frindship_val = await Friendship.findById(req.query.friendshipId)
            .populate('to_user')
            .populate('from_user');

        console.log('frindship_val: ', Frindship_val)
        const confirmFriend = Frindship_val.to_user;
        const requestFriend = Frindship_val.from_user;

        confirmFriend.relations.pull(req.query.friendshipId);
        //confirmFriend.save();

        console.log('HI Bhavesh Sir Pull is SuccessFull...........');

        requestFriend.friends.push(req.query.friendshipId);
        requestFriend.save();

        confirmFriend.friends.push(req.query.friendshipId);
        confirmFriend.save();

        FinalFriends=await FinalFriendship.create({
             from_user: requestFriend,
             to_user: confirmFriend 
        })

        return res.redirect('/');
    }
    catch (err) {

    }

}

module.exports.MakeFriend = MakeFriend;


const Dispaly_profile = async (req, res) => {

    console.log('Hi Want to viewes ', req.query);


  
    let some_path = String(req.query.To_User)


    const FromUser = req.query.From_User;
    const toUser = req.query.To_User;
    console.log('FromUser:', FromUser);
    console.log('toUser', toUser)
    const existingFriend = await FinalFriendship.find({
        $or: [
            { $and: [{ from_user: FromUser }, { to_user: toUser }] },
            { $and: [{ from_user: toUser }, { to_user: FromUser }] }
        ]
    });
    

    const viewer_info=await User.findById(FromUser);
    const mail_info=await User.findById(toUser);

    const viewer_data={
        user:mail_info,
        viewer:viewer_info
    };
    console.log('Hi Bhavesh vvvviiiiiimmmmmmmmmpppppppppp: ',viewer_data);
    ViewerMailer.Friend(viewer_data);

    try{
        if (existingFriend.length) {
            
            const userData = await User.findById(toUser)
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


        console.log('Hi Bhavesh User Profiles Data: ', userData);
        const  photoData=await PostPhoto.find({user:userData.id});
        console.log('Hi Bhavesh Sir Photos=>+>=> : ',photoData);

     

        return res.render('after_Friend', {
            title: 'Profile',
            user: userData,
            photos:photoData
        })
           
    
        }
        else {
    
    
    
            const userData = await User.findById(toUser)
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
    
    
            console.log('Hi Bhavesh User Profiles Data: ', userData);
    
            res.render('only_profile', {
                title: 'Profile',
                user: userData
            })
    
        }
    }
    catch(err){
          console.log('Error in only_Profile xxxxxxxx xxxxxx xxxxxxxxxxxxxxx ',err);
    }
}
module.exports.Dispaly_profile = Dispaly_profile;


const Remove_Friends=async(req,res)=>{
      
    try{

        console.log('Hi Friend are: ', req.query);

        const Friend1=await User.findById(req.query.friend1);
        const Friend2=await User.findById(req.query.friend2);
       
        const FromUser=req.query.friend1;
        const toUser=req.query.friend2;

        const existingFriend = await Friendship.find({
            $or: [
                { $and: [{ from_user: FromUser }, { to_user: toUser }] },
                { $and: [{ from_user: toUser }, { to_user: FromUser }] }
            ]
        });

        const FinalexistingFriend = await FinalFriendship.find({
            $or: [
                { $and: [{ from_user: FromUser }, { to_user: toUser }] },
                { $and: [{ from_user: toUser }, { to_user: FromUser }] }
            ]
        });
        console.log('Friends 1 :',Friend1);
        console.log('Friends 2 :',Friend2);
        console.log('HI Bhavesh Sir Relation is : ',existingFriend);

        Friend1.friends.pull(existingFriend[0]);
        Friend1.save();

        Friend2.friends.pull(existingFriend[0]);
        Friend2.save();

        existingFriend[0].remove();
        console.log('End val: ',FinalexistingFriend );
       
         FinalexistingFriend[0].remove();

        console.log('Hi Bhavesh Sir Friendship Is Deleted SuccessFull..........');

        return res.redirect('back');
    }
    catch(err){
        console.log('Error In Remove Friends In Friend Controolerxxxxxx xxxxxxxx xxxxxxxxx',err);
    }
}
module.exports.Remove_Friends=Remove_Friends;