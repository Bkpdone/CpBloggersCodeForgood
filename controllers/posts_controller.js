const { findById } = require('../models/post');
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const multer = require('multer')
const PostPhoto = require('../models/postpic');
const Notify=require('../mailers/notify_friends');
const Friendship = require('../models/friendship');
const Create = async (req, res) => {

  console.log('Hi Bhavesh Sir Picture: ', req.body);
  console.log('Hi Bhavesh Sir Id: ', req.user._id);
  try {

    let post_val;    
    if(req.body.photopath){

        post_val  = await Post.create({
        content: req.body.content,
        photo: req.body.photopath,
        user: req.user._id
      });
    }
    else{
      post_val  = await Post.create({
        content: req.body.content,
        user: req.user._id
      });
    }
   



    const valId=req.user._id
    const friends_val = await Friendship.find({
      $or: [
          { from_user: valId }, { to_user: valId },
      ]     
     })
     .populate('from_user')
     .populate('to_user')
    

    const info={
      all_mailId:friends_val,
      userId:valId
    }

    Notify.NotifyFriends(info);

    console.log("Hi Friends : ====+++++=====>",friends_val);

    console.log('Hi Bhavesh Sir Post is Created SuccessFully......................', post_val);
    return res.redirect('/');
  }
  catch (err) {
    console.log("Error => Post Controller xxxxxxxxxx xxxxxxxxxx xxxxxxxxxx", err);
    return;
  }

}
module.exports.Create = Create;

const Destroy = async (req, res) => {
  console.log('Hi Destroy Data: ', req.params.id);

  try {

    const Post_Del = await Post.findById(req.params.id);
    console.log('Hi Data: ', Post_Del);

    const Comment_Dal = await Comment.deleteMany({ post: req.params.id });

    console.log('Hi Bhavesh Sir Comment Deldete SuccessUffully......................');

    Post_Del.remove();

    console.log('hi Bhavesh Delete Post SuccessFully................................');

    res.redirect('/');
  }
  catch (err) {
    console.log('Error : Detroy Post xxxxxxxx xxxxxxxx xxxxxxxxxxxxx');
  }
}
module.exports.Destroy = Destroy

const UploadPic = async (req, res) => {

  try {

    console.log('HI Bhavesh Sir We are at PostPhoto :', req.params.id);

    const userData = await User.findById(req.params.id);
    const photo_val = await PostPhoto.create({
      user: req.user._id,
      photo: "Hi Bhavesh Sir"
    });

    console.log('Find User : ', userData);

    if (req.params.id == userData.id) {

      console.log('HI Bhavesh Sir Is are Matech ............................');

      PostPhoto.UpdatePhoto(req,res,function(){

        console.log('Bhavesh Sir File: ',req.file);

        if(req.file){
             photo_val.photo=PostPhoto.PhotosPath+'/'+req.file.filename;
             photo_val.save();
             console.log('HI Bhavesh Sir PhotoUploaded SuccessFully..............................',photo_val);
             return res.render('postphototext',{
              PhotoData:photo_val,
             });
        }

      })

    }

  }
  catch (err) {
    console.log('Error in Upload Pic Post controller xxxxxx xxxxxxx xxxxxxxx', err);
  }
}
module.exports.UploadPic = UploadPic;