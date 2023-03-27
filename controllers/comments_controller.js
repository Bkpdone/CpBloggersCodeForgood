const Comment = require('../models/comment');
const Post = require('../models/post')
console.log('Hi Bhavesh Sir We are at Comment Controlller...................');
const CommentMailler = require('../mailers/comments_mailer');

const Create = async (req, res) => {

      console.log('Hi bhavesh Data: ', req.body);
      console.log('User Id : ', req.user._id)
      try {

            const post_val = await Post.findById(req.body.postId);

            console.log('post for Comment => ', post_val);

            const commet_val = await Comment.create({
                  content: req.body.content,
                  user: req.user._id,
                  post: req.body.postId
            });

            post_val.comments.push(commet_val);
            post_val.save();

            console.log('Hi Bhavesh Sir Comment is Created SuccessFully........................', commet_val);

            const comment_data = await Comment.findById(commet_val.id)
                  .populate('user')
                  .populate({
                        path:'post',
                        populate:{
                              path:'user'
                        }
                  });

            console.log('commet_data for mail : ', comment_data);


            CommentMailler.new_Comments(comment_data);
            
            CommentMailler.Comment_alert(comment_data);
             
            return res.redirect('/');

      }
      catch (err) {
            console.log('Error In Comment Created xxxxxx xxxxxxxxx xxxxxxxxxxxxxxx ', err);
      }
}
module.exports.Create = Create;


const Destroy = async (req, res) => {

      console.log('Hi Bhavesh Sir Comment Id : ', req.params.id);

      try {

            comment_Del = await Comment.findById(req.params.id);

            if (comment_Del.id == req.params.id) {

                  console.log('Hi Bhavesh Ur Comment Id : ', comment_Del);

                  const postId = comment_Del.post;

                  console.log('Hi Bhavesh Sir =>+> PostId : ', postId);
                  comment_Del.remove();


                  await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

                  console.log('Hi Bhavesh Sir Comment Delete SuccessFully.....................');
                  return res.redirect('/');
            }
            else {
                  console.log('Error Or Wrong Things Happen Bhavesh Sir.... xxxxxxxx xxxxxxx xxxxxxxxx');
                  return;
            }

      }
      catch (err) {
            console.log('Error In Find Del Comments xxxxxx xxxxxxxxx xxxxxxxxxxxxx', err);
            return;
      }

}
module.exports.Destroy = Destroy