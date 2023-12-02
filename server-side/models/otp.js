import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    email: {type: String, required: true},
    code: {type: String},
    expireIn: {type: Number}
    
},{
    timestamps:true,
})


// const database = mongoose.connection.useDb('auth')
export default mongoose.model("otp", otpSchema)