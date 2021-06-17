const mongoose =require('mongoose');
var Schema = mongoose.Schema;
const UserSchema =mongoose.Schema({ 
      username : {
        type : String,
        required:true,
        min:6
    },
      password : {
      type : Number,
      required:true
  }
 
  });
  module.exports=mongoose.model('Users',UserSchema);