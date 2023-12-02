import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "tmp-products",
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
      enum: ["Not Processed", "Processing", "Prepared",  "Cancelled"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("tmp-orders", orderSchema);