import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
    },
    email: {
      type: String,
      unique:true,
      required:true,
      maxlength: 60,
    },
    password: {
        type:String,
        required:true
    },
    resetToken: { type: String },
    update: { type: String },
    validEmail: { type: String, default: "not" },
    emailToken: { type: String },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);