const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const {CloudinaryStorage}= require("multer-storage-cloudinary")
const passport = require("passport");
const authRoutes = require("./route/auth.js");
const cookieSession = require("cookie-session");
const session = require("express-session");
const Stategy = require("passport-google-oauth20");
const middleware = require("./middleware.js");
const GoogleStrategy = Stategy.Strategy;
const MongoStore = require('connect-mongo');

if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}


app.use(cors({
  origin: `${process.env.CLIENT_URL}`,   // allow Vite frontend
  methods: ["GET","POST","PUT","DELETE"],
  credentials:true,
}));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secure_key_here",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
    mongoUrl: process.env.ATLAS_URL,   // your MongoDB connection string
    collectionName: "sessions"
  }),
    cookie: {
      secure: false, // true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite:'none',
    },  
  })  
);  
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy({
          clientID:process.env.CLIENT_ID,
          clientSecret:process.env.CLIENT_SECRET,
          callbackURL:process.env.CALLBACK_URL, 
          scope: ["profile", "email"],
          allowedHeaders: ["Content-Type", "Authorization"],
       },
      function (accessToken,refreshToken,profile,callback){
               callback(null,profile);
     }
 )
);


passport.serializeUser((user, done) => {
            done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});       


app.use(express.json());

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "collegenotes",
    resource_type: "auto",
    allowed_formats: ["pdf", "doc", "docx","jpeg","png"],
  },
});

const upload = multer({ storage });

async function main(){
  await mongoose.connect(`${process.env.ATLAS_URL}`);
}
main().then(()=>{
  console.log("connected to database ")
}).catch((err)=>{
  console.log("error",err);
})

const store = MongoStore.create({
    mongoUrl:process.env.ATLAS_URL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,          //information will update after 24hrs if no change and update occur in session/database 
})

// MongoDB Schema
const Note = mongoose.model("Note", new mongoose.Schema({
  title: String,
  subject: String,
  Type: String,
  sem:String,
  file: String,
  UploadedBy:{
    type:String,
    default:"anonmyous",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}));
app.use(express.json());
// app.use((req, res, next) => {
//   console.log("➡️ Incoming:", req.method, req.url);
//   next();
// });
app.get("/",(req,res)=>{
  res.send("server is working");
});
app.get("/upload",(req,res)=>{
  res.send("working");
})
// Upload Route
// Global request logger (keeps what you already saw)
app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});

app.post("/upload",middleware,upload.single("file"), async (req, res,next) => {       //upload is a multer instance which upload single item of key = "file" sent at post req
  console.log("recieved req at /upload ");
 // console.log("req is ",req);
  try {
    console.log("Incoming fields:", req.body);
    console.log("Incoming file:", req.file);
    
    const { title, subject, Type, sem } = req.body;
    
    if (!req.file) {
      throw new Error("No file received.");
    }
    
    const fileUrl = req.file.path;
    console.log("file url is ",fileUrl);
    if (!fileUrl) {
      throw new Error(" File upload to cloud failed.");
    }
    
    const note = new Note({ title, subject, Type, sem, file : fileUrl,UploadedBy:req.user?._json?.name || "anonymous"});
    await note.save();
    
    res.status(201).json({ message: "Uploaded successfully", note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// Fetch All Notes Route
app.get("/notes",middleware,async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);             // give notes as response when fetch req, is sent via frontend 
});

app.use("/auth",authRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
