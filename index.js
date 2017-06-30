const express = require('express');
const server = express();
const port = process.env.PORT || 8080;

//middlleware imports
const logger = require('./middleware/logger');
//routers
const weatherRouter = require('./routers/weather.router');

//middleware used
server.use(logger);
server.use(weatherRouter);//similar to include

//dummy route for testing
server.get('/',(request, response)=>{
  response.send('it works'); //send will send plain text (rather than sendFile)
});

server.listen(port, ()=>{
  console.log('Now listening on port: ', port);
});
