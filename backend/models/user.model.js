import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        lowercase:true,
    },
    email:{
        type:String,
        required,
    },
    password:{
        type:String,
        required,
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true});

userSchema.pre("save",async function(next){
    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

userSchema.isCorrPass = async function(password){

}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:REFRESH_TOKEN_EXPIRY})
}

const User = mongoose.model("User",userSchema);
