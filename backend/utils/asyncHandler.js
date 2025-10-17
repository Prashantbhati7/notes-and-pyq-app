const asyncHandler = (fn)=>{
    return async(req,res,next)=>{
        try{
            fn(req,res,next);
        }catch(err){
            console.log("error ",err);
            res.status(500).json({success:false,message:err?err.message:"something went wrong "});
        }
    }

}

export default asyncHandler;