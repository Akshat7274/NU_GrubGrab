import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "ag-products",
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

export default mongoose.model("ag-orders", orderSchema);