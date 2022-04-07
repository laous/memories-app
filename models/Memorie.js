import mongoose from "mongoose";

const MemorieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 400,
    },
    hashtag: {
      type: [String],
      default: ['no-hashtag'],
    },
    image: {
      type: String,
      required:true,
      maxlength: 400,
    },
    email:{ 
      type: String,
      required:true 
    },
    username:{ 
      type: String,
      required:true 
    },
    
  },
  { timestamps: true }
);

export default mongoose.models.Memorie || mongoose.model("Memorie", MemorieSchema);