const { query } = require('express');
var express = require('express');
 let date= new Date();
 let timenow= date.getHours()+":"+date.getMinutes();
const app = express();
 ////////Create a simple express server///////////
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

