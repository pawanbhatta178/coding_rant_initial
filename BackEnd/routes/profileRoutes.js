const router=require('express').Router();
const authCheck=require('../authCheck.js');


router.get('/',authCheck,(req,res)=>{
    res.send('You are logged in as '+ req.user.displayName)
})
module.exports=router;