
const authCheck=(req,res,next)=>{
    if(!req.user){
        if(req.method==="GET"){
            res.redirect("/");
        }
        res.status(401).send("Not authorized");
    }
    else{
        next();
    }
}

module.exports=authCheck;