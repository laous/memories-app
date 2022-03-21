import mongoose from "mongoose";

const MemorieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    small_desc: {
      type: String,
      required: true,
      maxlength: 150,
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
    user:{ 
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
      required:true 
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    
  },
  { timestamps: true }
);

export default mongoose.models.Memorie || mongoose.model("Memorie", MemorieSchema);