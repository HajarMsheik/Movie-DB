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
/////////////////////////////////////////

