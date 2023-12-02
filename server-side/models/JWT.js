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
    timestamps: true
  }
);

// const database = mongoose.connection.useDb('auth')
export default mongoose.model("JWT", JWTschema);