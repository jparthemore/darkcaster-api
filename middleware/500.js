const errorHandler = (err,request,response,next)=>{
  response.status(500).json({
    message: 'uh oh! something is broken'
  });
}; //if 4 arguement express knows it's an error handler

module.exports = errorHandler;
