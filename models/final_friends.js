const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({

    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

const FinalFriendship= mongoose.model('FinalFriendship',friendshipSchema);

module.exports=FinalFriendship;