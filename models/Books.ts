import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
  book: String,
});

export default mongoose.model("Books", bookSchema);
