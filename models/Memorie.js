import mongoose from "mongoose";

const MemorieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
    },
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    hashtag: {
      type: String,
      default: 0,
    },
    image: {
      type: String,
      maxlength: 400,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Memorie || mongoose.model("Memorie", MemorieSchema);