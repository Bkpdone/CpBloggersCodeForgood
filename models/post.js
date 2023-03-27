const mongoose = require('mongoose');



const PostSchema = new mongoose.Schema({

    content: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    photo: {
        type: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
    ,
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]

},
{
    timestamps:true
});



const Post = mongoose.model('Post', PostSchema);

module.exports = Post;