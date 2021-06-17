const express = require('express');
const Moviemodels = require('../models/Moviemodels.js');
const router =express.Router();


const movies = [
   { title: 'Jaws', year: 1975, rating: 8 },
   { title: 'Avatar', year: 2009, rating: 7.8 },
   { title: 'Brazil', year: 1985, rating: 8 },
   { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]
////////////////////////////////////////////////////////////////
 router.get('/read',function (req, res) {
    movLen = movies.length;
    text = "<ul>";
    for (i = 0; i < movLen; i++) {
      text += "<li>" + movies[i].title + "</li>";
    }
    text += "</ul>";
    

    res.send( "status:200, data:" + text);}  )
//////////////////////////////////////////////////////////////////
    router.get('/read/by-date',function (req, res) {
        movies.sort(function(a, b) {
            var dateA = new Date(a.year), 
            dateB = new Date(b.year);
            return dateA - dateB;
              
        });
        res.send({status:200, data:movies});
    })
///////////////////////////////////////////////////////////////////////
router.get('/read/by-rate',function (req, res) {
        movies.sort(function(a, b) {
            var RateA = a.rating, 
            RateB = b.rating;
            return RateA - RateB;
              
        });
        res.send({status:200, data:movies});
    })
////////////////////////////////////////////////////////////////////////
router.get('/read/by-title',function (req, res) {
    movies.sort(function(a, b) {
        var titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
    });
        res.send({status:200, data:movies});
    })
///////////////Step 7 - READ ONE////////////////////////////////////////
router.get('/read/:id',function (req, res) {
    movlen=movies.length;
     let nb=req.params.id;
     if(nb>movlen){ 
              res.send(  {status:404, error:true, message:'the movie <ID> does not exist'});
     }
     else{
        res.send({status:200, data:movies[nb]});

     }         
})
/////////////////step 8////////////////////////////////////////////////
router.get('/add?',function (req, res) {
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
//////////////////////Step 9 - DELETE///////////////////////////// 
router.get('/delete/:id', function(req, res) {
    if( req.query.id <=0 || req.params.id > movies.length){
      res.send(  {status:404, error:true, message:'the movie <ID>'+req.params.id +'does not exist'});
    }
    else{
        movies.splice(req.params.id -1, 1);
        res.send(  {status:200, data:movies});
    }
  }); 
/////////////////////Step 10 - UPDATE//////////////////////////////////
     router.get('/update/:Id?',function (req, res) {
      
       let  Idselected,titleselected,yearselected,ratingselected;
         if(req.params.Id){ 
           Idselected=req.params.Id ;
         }
         if(req.query.titleselected){ 
          titleselected=req.query.titleselected;
         movies[Idselected-1].title=titleselected;
        }
         if(req.query.yearselected){ 
           yearselected=req.query.yearselected;
           movies[Idselected-1].year=yearselected;
        }
         if(req.query.ratingselected){ 
           ratingselected=req.query.ratingselected;
           movies[Idselected-1].rating=ratingselected;
      }
      
          res.send({status:200, data:movies});     
      })
////////////////////////////////////////////////////////////////////

   
   
module.exports=router;