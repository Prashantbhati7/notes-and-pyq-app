import mongoose, { connect } from "mongoose";
const db_name = "college-notes";

const connection = async(req,res)=>{
    try{
        await mongoose.connect(`${process.env.ATLAS_URL}/${db_name}`);
        console.log("connected to database successfully ");
    }catch(err){
        console.log("error ",err);

    }
}

export default connection;