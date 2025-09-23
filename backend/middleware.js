const middleware = (req,res,next)=>{
    if(req.isAuthenticated()){
        console.log("logged in already ");
        
    }
    else { console.log("not logged in ");
        return res.status(401).json({message:"unautherised"});
    };
    console.log(req.isAuthenticated());
    next();
}
module.exports = middleware;