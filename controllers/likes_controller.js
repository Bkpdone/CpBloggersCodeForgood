const Post=require('../models/post');
const Like=require('../models/like');
const Comment=require('../models/comment');

const Toggle=async (req,res)=>{

    console.log('get data: ', req.query);
    console.log('get data: ', req.query.id);
    console.log('get data: ', req.query.type);
     try{
        let likeableVal;
    
        if(req.query.type=='Post'){
            
               likeableVal=await Post.findById(req.query.id).populate("likes");
              
        }
        else{
          console.log('Pagal')
               likeableVal=await Comment.findById(req.query.id).populate("likes");
        }
        console.log('Hi Bhavesh Sir likable Post/Comment : ',likeableVal);

        const existingLike= await Like.findOne({
          user:req.user._id,
          likeable:req.query.id,
          onModel:req.query.type
        });

        if(existingLike){
           
           likeableVal.likes.pull(existingLike);
           likeableVal.save();
           existingLike.remove();
        }
        else{
          const newLike= await Like.create({
            user:req.user._id,
            likeable:req.query.id,
            onModel:req.query.type
          });
           
          likeableVal.likes.push(newLike);
          likeableVal.save();
        }
        return res.redirect('/');
     }
     catch(err){
        console.log('Error in Likes Controller xxxxxxxxx xxxxxx xxxxxxxxxxx ',err);
     }

}

module.exports.Toggle=Toggle