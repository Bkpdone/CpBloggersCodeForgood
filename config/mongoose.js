const mongoose=require('mongoose');
const env=require('../config/environment');
mongoose.set('strictQuery',false);
mongoose.connect(`mongodb://localhost/${env.db}`);

const db=mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(err, res){
  console.log("Hi Bhavesh Sir MongoDb DataBase is Connected SuceessFully.............");
});

module.exports=db;