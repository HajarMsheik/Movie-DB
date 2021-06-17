const express = require('express');
const app = express();
const mongoose=require('mongoose');
require('dotenv/config');

const PostsMovie=require('./routes/movies');
const Moviemodels = require('./models/Moviemodels.js');

//use middleware
app.use('/movies',PostsMovie);
app.use(express.json());
 ////////Create a simple express server///////////
 const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]
let date= new Date();
let timenow= date.getHours()+":"+date.getMinutes();
app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
app.get('/', (req, res) => {
    res.send('ok!')
  })
////////Step 3 - Create an express simple API/////////
app.get('/test', (req, res) => res.send({status:200, message:"ok"}));


app.get('/time', (req, res) => res.send({status:200, message:timenow}));  
//////////Step 4 - Let's complicate the API/////////
app.get('/hello/:Id', function(req, res) {
    res.send( "status:200, message:Hello " +req.params.Id);
  });
app.get('/hello/', function(req, res) {
    res.send( "status:200, message:Hello " );
  });

  app.get('/search?',function (req, res) {
      const {s} = req.query;
      if(s=== ""){  
        res.send( "status:500, error:true, message:you have to provide a search");}
      else  { 
      res.send( "status:200, message:'ok', data:" + req.query.s);}
})

/////////////////////////////////////////////////////////////
   //connecting to database
   mongoose.connect(process.env.DB_c0nnection,{useNewUrlParser: true,useUnifiedTopology: true},
   ()=>
   console.log("connected to db!!!!") );
///////////////////////////////step 11 & 12 /////////////////////////////
         //adding new data through post man and save it in database
        //delete and update is the same///////////
   app.post('/add',function (req, res) {
    try {
      const newMovie = new Moviemodels({
          id: mongoose.Types.ObjectId(),
          title: req.body.title,
          year: req.body.year ,
          rating: req.body.rating  ,
      });
      console.log(newMovie);
       newMovie  =  newMovie.save()
      res.json(newMovie)
  } catch(err){
      res.json({message: err.message })

  }
});
  /////////////////////////////////////////////////////////////////////////
module.exports=app;