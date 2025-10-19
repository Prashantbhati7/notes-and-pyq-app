
import dotenv from "dotenv";
if (process.env.NODE_ENV != "production"){
    dotenv.config();
}
import { v2 as cloudinary} from "cloudinary"; 
import fs from "fs";             // Node js defalt lib to read write remove etc 
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
const uploadOnCloudinary = async (localfilepath)=>{
   // console.log("file path for cloudinary is ",localfilepath);
   try {
        console.log("local file path is ",localfilepath);
        if (!localfilepath) return null
        
        const response = await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })
        console.log("response from cloudinary is ",response);
        fs.unlinkSync(localfilepath)
        console.log("uploaded on cloudinary ",localfilepath);
        
        return response;
    }  catch (error) {
        console.log("error on uploading on clodinary ",localfilepath);
        fs.unlinkSync(localfilepath) // remove the locally saved temporary file as the upload operation got failed
        return null;
}

}


export {uploadOnCloudinary}