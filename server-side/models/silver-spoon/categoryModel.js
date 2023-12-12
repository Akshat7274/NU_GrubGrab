import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    // unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  deleted: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("ss-category", categorySchema);