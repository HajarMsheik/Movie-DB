var express = require('express');
 
const app = express();
 //listen to port 3000
app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('ok!')
  })
///////////////////////////////////////////