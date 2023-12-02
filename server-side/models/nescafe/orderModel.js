import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
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

// const database = mongoose.connection.useDb('nescafe')
export default mongoose.model("Order", orderSchema);