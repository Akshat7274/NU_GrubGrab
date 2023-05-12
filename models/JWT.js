import mongoose from "mongoose";

const JWTschema = mongoose.Schema(
  {
    JWT: {
      type: String,
      required: true,
    },
    expireIn: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("JWT", JWTschema);
