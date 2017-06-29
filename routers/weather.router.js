const express = require ('express');
const router = express.Router(); //meant to be used in constructior w/router

router.get('/weather',(request,response)=>{  //broswer listening for that type of requiest
  response.send('Here be the weather');
});
router.get('/weather/:lat,:lon',(request,response)=>{
  response.send('Here be the weather for that place');
});
module.exports = router;
