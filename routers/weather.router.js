/*jshint esversion: 6*/
const express = require ('express');
const router = express.Router(); //meant to be used in constructior w/router
const darksky = process.env.DARKSKY || require ('../credentials').darksky; //be careful - want value of property - api key brancelet - get in - key
//const baseUrl = `https://api.darksky.net/forecast/${darksky}/37.8267,-122.4233`;//don't always want alcatraz
const geocoder = process.env.GEOCODER || require ('../credentials').geocoder;

const baseUrl = `https://api.darksky.net/forecast/${darksky}/`;
const geocodeBaseUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${geocoder}&`;
const axios = require('axios'); //by default lllooks in node-Mo

router.get('/weather',(request,response,next)=>{  //broswer listening for that type of requiest
  //response.send('Here be the weather');
  const url = `${baseUrl}29,-82`;
  axios.get(url)
       .then(weather =>{
          response.json(weather.data);
        })
        .catch(err=>{
          //console.error(err); //wil print to server log (print in heroku)
          next(err);
        });
});
router.get('/weather/:lat,:lon',(request,response,next)=>{
  const lat = request.params.lat;
  const lon = request.params.lon;
  const url = `${baseUrl}${lat},${lon}`;
  axios.get(url)
       .then(weather =>{
          response.json(weather.data);
        })
        .catch(err=>{
          //console.error(err); //wil print to server log (print in heroku)
          next(err);
        });
  //response.send('Here be the weather for that place');
});
router.get('/weather/location/:location',(req,resp,next)=>{
  //const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=Gainesville,+FL&key=AIzaSyAiVQp8VR5HMhDlEtI94WErFqWr_Sn4qvQ';
  const loc = req.params.location;
  const url = `${geocodeBaseUrl}address=${loc}`;
  //console.log(`${url}`);
  axios.get(url)
       .then(geocoder =>{
         // resp.json(geocoder.data.results);//this gives all the results portion of the output
         //resp.json(geocoder.data.results[0].geometry.location);//this will get me both lat and lng
         const coordinates =[];
         coordinates[0] = geocoder.data.results[0].geometry.location.lat;
         coordinates[1] = geocoder.data.results[0].geometry.location.lng;
         //const lng = geocoder.data.results[0].geometry.location.lng;
         //const lat = geocoder.data.results[0].geometry.location.lat;
         //resp.send(`${lat},${lng}`);
         return(coordinates);
       })
       .then((data) =>{
         //resp.send(data);
         const lat = data[0];
         const lon = data[1];
         const url = `${baseUrl}${lat},${lon}`;
         //console.log(url);
         axios.get(url)
              .then(weather =>{
                 resp.json(weather.data);
               })
               .catch(err=>{
                 next(err);
               });
       })
       .catch(err=>{
         next(err);
       });


});

module.exports = router;
