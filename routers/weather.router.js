/*jshint esversion: 6*/
const express = require ('express');
const router = express.Router(); //meant to be used in constructior w/router

const darksky = process.env.DARKSKY || require ('../credentials').darkskykey; //be careful - want value of property - api key brancelet - get in - key
const geocoder = process.env.GEOCODER || require('../credentials').geocoderkey;

const baseDarkSkyUrl = `https://api.darksky.net/forecast/${darksky}/`;
//https://api.darksky.net/forecast/a2227f6b9666077591e3d5a1021e5b25/37.8267,-122.4233 //alcatraz

const baseGeocoderUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${geocoder}&address=`;
//https://maps.googleapis.com/maps/api/geocode/json?address=Gainesville,+FL&key=AIzaSyAiVQp8VR5HMhDlEtI94WErFqWr_Sn4qvQ';

const axios = require('axios'); //by default looks in node_modules

router.get('/weather',(request,response,next)=>{  //broswer listening for that type of requiest
  //response.send('Here be the weather');
  const url = `${baseDarkSkyUrl}29,-82`;
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
  const url = `${baseDarkSkyUrl}${lat},${lon}`;
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
router.get('/weather/location/:location',(request,response,next)=>{
  const loc = request.params.location;
  const locUrl = `${baseGeocoderUrl}${loc}`;

  axios.get(locUrl)
  .then(geocoder=>{
    const lat = geocoder.data.results[0].geometry.location.lat;
    const lng = geocoder.data.results[0].geometry.location.lng;
      //response.json(geocoder.data.results[0].geometry.location);
      return(`${baseDarkSkyUrl}${lat},${lng}`);
  })
  .then(url=>{
    axios.get(url)
      .then(weather=>{
          response.json(weather.data);
      })
      .catch(err=>{
        next(err);
      });
  })
  .catch(err=>{
    next(err);
  });

  //response.send('weather by physical location');
});
module.exports = router;
