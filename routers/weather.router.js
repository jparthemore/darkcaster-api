const express = require ('express');
const router = express.Router(); //meant to be used in constructior w/router
const darksky = require ('../credentials').darksky; //be careful - want value of property - api key brancelet - get in - key
//const baseUrl = `https://api.darksky.net/forecast/${darksky}/37.8267,-122.4233`;//don't always want alcatraz
const baseUrl = `https://api.darksky.net/forecast/${darksky}/`;
const axios = require('axios'); //by default lllooks in node-Mo

router.get('/weather',(request,response)=>{  //broswer listening for that type of requiest
  //response.send('Here be the weather');
  const url = `${baseUrl}29,-82`;
  axios.get(url)
       .then(weather =>{
          response.json(weather.data);
        })
        .catch(err=>{
          console.error(err); //wil print to server log (print in heroku)
        });
});
router.get('/weather/:lat,:lon',(request,response)=>{
  const lat = request.params.lat;
  const lon = request.params.lon;
  const url = `${baseUrl}${lat},${lon}`;
  axios.get(url)
       .then(weather =>{
          response.json(weather.data);
        })
        .catch(err=>{
          console.error(err); //wil print to server log (print in heroku)
        });
  //response.send('Here be the weather for that place');
});
module.exports = router;
