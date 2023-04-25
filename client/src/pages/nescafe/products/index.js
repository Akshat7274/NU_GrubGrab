import connectDB from "../../../../../config/connectDB";
import Product from "../../../../../models/nescafe/Product";

export default async function handler(req, res) {
    const {method} = req;

    connectDB()

    if (method === "GET"){}

    if (method === "POST"){
        try {
            
        } catch (error) {
            res.status(500).json(error)
            
        }

    }

}