import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    require: [true, "User mush have a email"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "User mush have a password"],
  },
});

export default mongoose.model("users", userSchema);
