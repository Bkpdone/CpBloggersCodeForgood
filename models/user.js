const mongoose = require('mongoose');
const multer=require('multer');
const path=require('path');
const Avatar_Path=path.join('/uploads/users/avatar');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
    ,
    password: {
        type: String,
        required: true
    },
    relations:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship'
        }
    ],
    friends:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship'
        }
    ],
    avatar:{
        type:String
    },
    about:{
        type:String
    },
    cfname:{
        type:String
    },
    cfData:{
        type:Object
    },
    cfRating:{
        type:Number
    }
},
    {
        timestamps: true
    }
);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname, '..',  Avatar_Path) )
    },
    filename: function (req, file, cb) {
        console.log("Hi Bhavesh muulter2");
        cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
  UserSchema.statics.updateAvatar = multer({ storage: storage }).single('avatar');

  UserSchema.statics.AvatarPath= Avatar_Path;


const User = mongoose.model('User', UserSchema);

module.exports = User;