const mongoose =require('mongoose');
var Schema = mongoose.Schema;
const PostSchema =mongoose.Schema({ 
  title : {
      type : String,
      required:true
  },
    year : {
    type : Number,
  required:true
},
 rating : {
    type :Number,
   required:true
}
});
module.exports=mongoose.model('Moviescluster',PostSchema);