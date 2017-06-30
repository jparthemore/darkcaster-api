const notFound = (request,response,next)=>{
  response.status(404).json({
    message: "These are not the droids you are looking for"
  }); //will actually change status to code 404
};

module.exports = notFound;
