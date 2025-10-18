import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

import apiResponse from "../utils/apiResponse.js"
import { set } from "mongoose";

const generateAccessAndRefreshToken  = async(userid)=>{
    try{    
            const user = await User.findById(userid);
            if (!user) throw new apiError(400,"user not found");
            const accessToken = await user.generateAccessToken();
            const refreshToken = await user.generateRefreshToken();

            user.refreshToken = refreshToken;
            await user.save({validateBeforeSave:false});
            return {accessToken,refreshToken};
    }catch(err){
        console.log("error",err);
        throw new apiError(500,"access token and refresh token not generated ");
    }
}



const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    if (email.trim()=="" || password.trim()=="")  throw new apiError(400,"email and password are required ");
    const already = await User.findOne({$or:[{email},{username}]});
    if (already) throw new apiError(400,"user with email or username already exists ");

    const dbresponse = await User.create({
        username :username,
        email:email,password:password,
    })

    const registeredUser = await User.findById(dbresponse._id).select("-password");

    if (!registeredUser) throw new apiError(400,"user not registered ");

    // const accessToken = await registeredUser.generateAccessToken();
    // const refreshToken = await  registeredUser.generateRefreshToken();

    // if (!accessToken || !refreshToken ) throw new apiError(401,{},"access tokens not generated ");

    // registeredUser.refreshToken = refreshToken;

    // await registeredUser.save({validateBeforeSave:false});

    const {refreshToken,accessToken} = await generateAccessAndRefreshToken(registeredUser._id);

    if (!accessToken || !refreshToken) throw new apiError(401,"accesstoken and refresh token not generated ");

    console.log(`${username} registered successfully !!`)
    const options = {
        httpOnly:true,
        secure:process.env.NODE_ENV=="production",
    }
    return res.status(200).cookie(
        "accessToken",accessToken,options
    ).cookie("refreshToken",refreshToken).json(new apiResponse(200,registeredUser,"user registedred successfully ! "))
})

const loginuser = asyncHandler(async(req,res)=>{
        const {username,email,password} = req.body;
        if (!username && !email) throw new apiError(400,"email or username is requireed");
        const user = await User.findOne({$or:[{email},{username}]});
        if (!user) throw new apiError("User with these credentials not found ");

        const correctpass =await  user.isCorrectPass(password);
        if (!correctpass) throw new apiError(400,"password is wrong,please re-enter the password ");

        const {refreshToken,accessToken} = await generateAccessAndRefreshToken(user._id);
        
        const loggedinuser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly:true,
            sercure:process.env.NODE_ENV === "production",

        }
        return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
            new apiResponse(200,{loggedinuser,accessToken,refreshToken},"user Logged in successfully !! ")
        );
})

const logoutuser  = asyncHandler(async(req,res)=>{
    const user = req.user._id;
    if (!user) throw new apiError(400,"Authentication failed !!");
    await User.findByIdAndUpdate(req.user._id,{
        $unset:{
            refreshToken:1,
        },
    },
    {
        new:true,
    })

    const options = {
        httpOnly:true,
        secure:process.env.NODE_ENV==="produntion",
    }

    return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(new apiResponse(200,{},"user Logged out seccessfully "))

})
const authuser = asyncHandler(async(req,res)=>{
    const user = req.user;
    if (!user) throw new apiError(400,"User not found");
    return res.status(200).json(new apiResponse(200,{user:user},"user is logged in already "));
})
export {registerUser,loginuser,logoutuser,authuser};