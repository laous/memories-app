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
    userId: { 
      type: mongoose.Types.ObjectId, 
      ref: 'users' 
    }
    
  },
  { timestamps: true }
);

export default mongoose.models.Memorie || mongoose.model("Memorie", MemorieSchema);