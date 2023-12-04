import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "nescafe-products",
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
      enum: [
        "Not Processed",
        "Processing",
        "Prepared",
        "Collected",
        "Cancelled",
      ],
    },
    instruction: {
      type: String,
      default: "none",
    },
    review: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("nescafe-orders", orderSchema);
