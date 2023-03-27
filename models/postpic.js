const mongoose=require('mongoose');


const multer = require('multer');
const path = require('path');
const Photos_Path = path.join('/uploads/posts/photos');

const PostPhotoSchema=new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  photo:{
    type:String,
    require:true
  }
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', Photos_Path));
  },
  filename: function (req, file, cb) {

      cb(null, file.fieldname + '-' + Date.now())
  }
})

PostPhotoSchema.statics.UpdatePhoto= multer({ storage: storage }).single('photo');
PostPhotoSchema.statics.PhotosPath=Photos_Path;


const PostPhoto=mongoose.model('PostPhoto',PostPhotoSchema);

module.exports=PostPhoto;