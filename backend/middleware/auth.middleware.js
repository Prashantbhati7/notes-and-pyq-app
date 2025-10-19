import asyncHandler from "../utils/asyncHandler.js";

import apiError from "../utils/apiError.js";
import jwt  from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req,res,next)=>{        // to verify if user is authenticated or not 
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");            // custom header for case of mobile application 
        if (!token){
            throw new apiError(401,"Authentication failed   ! ")
        }
        const decoded_token =  jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decoded_token?._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401,"invalid Access token");
        }
        console.log("before logout user is ",user);
        req.user = user;
        next()
    } catch (error) {
        throw new apiError(402,error?.message || "error in verifying jwt token ");
    };

})