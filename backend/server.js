import express, { urlencoded } from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connection from "./db/index.js";
import Note from "./models/notes.model.js";
import { upload } from "./middleware/multer.middleware.js";
import { uploadOnCloudinary } from "./utils/cloudinary.js";
import asyncHandler from "./utils/asyncHandler.js";
import apiError from "./utils/apiError.js";
if(process.env.NODE_ENV !== "production"){
    dotenv.config();
}


app.use(cors({
  origin: `${process.env.CLIENT_URL}`,   // allow Vite frontend
  methods: ["GET","POST","PUT","DELETE"],
  credentials:true,
}));

app.use(express.json());
app.use(urlencoded({extended:true}))

app.use(express.static("public"));
app.use(cookieParser());


connection().then(()=>{
  console.log("connected to mongoose successfully ");
}).catch((error)=>{
  console.log("error ",error);
})


app.get("/",(req,res)=>{
  res.send("server is working");
  console.log("server is working ");
});

import userRouter from "./route/user.routes.js";

app.use("/api/v1/user",userRouter);
app.get("/upload",(req,res)=>{
  res.send("working");
})

app.post("/upload",upload.single("file"),asyncHandler( async (req, res,next) => {       //upload is a multer instance which upload single item of key = "file" sent at post req
  console.log("recieved req at /upload ");
 // console.log("req is ",req)
    console.log("Incoming fields:", req.body);
    console.log("Incoming file:", req.file);
    
    const { title, subject, Type, sem } = req.body;
    
    if (!req.file) {
      throw new apiError(401,"No file received.");
    }
    
    console.log("req.file.path is  ",req.file.path);
    const fileLocalpath= req.file.path;
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error("Cloudinary environment variables not set");
    }
    console.log("process.env.CLOUDINARY_CLOUD_NAME IS ",process.env.CLOUDINARY_CLOUD_NAME,"  cloud api key is ",process.env.CLOUDINARY_API_KEY," cloud api secret is ",process.env.CLOUDINARY_API_SECRET)
    const fileurl = await uploadOnCloudinary(fileLocalpath);
    console.log("fileurl is ",fileurl.url);
    if (!fileurl) throw new apiError(402,"cloudinary error ");

    
    const note = new Note({ title, subject, Type, sem, file : fileurl.url,UploadedBy:req.user?._json?.name || "anonymous"});
    await note.save();
    
    res.status(201).json({ message: "Uploaded successfully", note });
}));

//Fetch All Notes Route
app.get("/notes",async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);             // give notes as response when fetch req, is sent via frontend 
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
