import mongoose from "mongoose";

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


export default Note;