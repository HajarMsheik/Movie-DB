const { query } = require('express');
var express = require('express');
 let date= new Date();
 let timenow= date.getHours()+":"+date.getMinutes();
 const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

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
//////////////Step 5 - Set up the basis for CRUD//////////////////////
app.get('/movies/read',function (req, res) {
    movLen = movies.length;
    text = "<ul>";
    for (i = 0; i < movLen; i++) {
      text += "<li>" + movies[i].title + "</li>";
    }
    text += "</ul>";
    

    res.send( "status:200, data:" + text);}  )
////////////////Step 6 - SEARCH/////////////////////////////////////////////
app.get('/movies/read/by-date',function (req, res) {
        movies.sort(function(a, b) {
            var dateA = new Date(a.year), 
            dateB = new Date(b.year);
            return dateA - dateB;
              
        });
        res.send({status:200, data:movies});
    })

app.get('/movies/read/by-rate',function (req, res) {
        movies.sort(function(a, b) {
            var RateA = a.rating, 
            RateB = b.rating;
            return RateA - RateB;
              
        });
        res.send({status:200, data:movies});
    })

app.get('/movies/read/by-title',function (req, res) {
    movies.sort(function(a, b) {
        var titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
    });
        res.send({status:200, data:movies});
    })
///////////////Step 7 - READ ONE////////////////////////////////////////
app.get('/movies/read/:id',function (req, res) {
    movlen=movies.length;
     let nb=req.params.id;
     if(nb>movlen){ 
              res.send(  {status:404, error:true, message:'the movie <ID> does not exist'});
     }
     else{
        res.send({status:200, data:movies[nb-1]});

     }         
})
/////////////////step 8////////////////////////////////////////////////
app.get('/movies/add?',function (req, res) {
  const title = req.query.title;
  const year = req.query.year;
  const rating = req.query.rating;
   
    if(title==""|| year=="" || isNaN(year) || year.toString().length !=4 )
    { 
      res.send(  {status:403, error:true, message:'you cannot create a movie without providing a title and a year'});
       
    }
      else
      {
          if(title!=""&& year!="" && rating=="")
          {
            movies.push({ "title" : title , "year" :year ,  "rating":4  },);
                  res.send(  {status:200, data:movies});
          }
          else{
                  movies.push({ "title" : title , "year" :year ,  "rating":rating  },);
     
                  res.send(  {status:200, data:movies});

                

              }
      }
})
///////////////////////////////////////////////////////////////