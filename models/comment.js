const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({

    content: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps:true
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;