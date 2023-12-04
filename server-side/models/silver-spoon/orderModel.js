import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "ss-products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Processing", "Prepared", "Collected",  "Cancelled"],
    },
    instruction: {
      type: String,
      default: "",
    },
    review: {
      type: Number,
      default: 0
    },
    outlet: {
      type: String,
      default: "silver-spoon",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ss-orders", orderSchema);