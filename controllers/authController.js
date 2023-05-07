import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import nodemailer from "nodemailer";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import User from "../models/userModel.js"
import bcrypt from "bcrypt";
import Otp from "../models/otp.js"

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
      isGoogle: "false",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

// export const forgotPasswordController = async (req, res) => {
//   try {
//     const { email, answer, newPassword } = req.body;
//     if (!email) {
//       res.status(400).send({ message: "Emai is required" });
//     }
//     if (!answer) {
//       res.status(400).send({ message: "answer is required" });
//     }
//     if (!newPassword) {
//       res.status(400).send({ message: "New Password is required" });
//     }
//     //check
//     const user = await userModel.findOne({ email, answer });
//     //validation
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "Wrong Email Or Answer",
//       });
//     }
//     const hashed = await hashPassword(newPassword);
//     await userModel.findByIdAndUpdate(user._id, { password: hashed });
//     res.status(200).send({
//       success: true,
//       message: "Password Reset Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Something went wrong",
//       error,
//     });
//   }
// };

export const emailSend = async(req, res) => {
  const data = await User.findOne({email:req.body.email});
  const responseType = {}
  if(data){
      var randOtp = Math.random()
      while (randOtp<0.1){
          randOtp = Math.random()
      }
      let otpcode = Math.floor((randOtp*10000));
      let otpData = new Otp({
          email: req.body.email,
          code:otpcode,
          expireIn: new Date().getTime() + 300*1000
      })
      let otpResponse = await otpData.save();
      responseType.statusText = 'Success'
      mailer(req.body.email,otpcode)
      responseType.message = 'Please check your email id for OTP';
  }else{
      responseType.statusText = 'Error'
      responseType.message = "Email id doesn't exist";
  }
  res.status(200).json({responseType});
}

const mailer = (email,otp) =>{
  // var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
          user: 'nugrubgrab@gmail.com',
          pass: 'sogabipyglqkfsda'
      },
      tls : { rejectUnauthorized: false }
  });

  var mailOptions = {
      from: 'nugrubgrab@gmail.com',
      to: email,
      subject: 'OTP from NU GrubGrab',
      text: 'Thank you\nHere is your OTP: ' + otp
  };

  transporter.sendMail(mailOptions, function(error,info){
      if(error){
          console.log(error);
      }
      else {
          console.log('Email sent: ' + info.response);
      }
  });
}

export const changePassword = async(req, res) => {
  let fnd = await Otp.find({email:req.body.email,code:req.body.otpcode});
  let data = fnd[0]
  const response = {};
  if(data){
      let currentTime = new Date().getTime();
      let diff = data.expireIn - currentTime;
      if(diff < 0){
          response.message = 'Token expired'
          response.statusText = 'error'
      } else {
          let user = await User.findOne({email:req.body.email})
          const hashedPassword = await bcrypt.hash(req.body.password, 12)
          user.password = hashedPassword;
          user.save();
          response.message = 'Password Changed Successfully'
          response.statusText = 'Success';
      }
  }else {
      response.message = 'Invalid OTP'
      response.statusText = 'error'
  }
  res
      .status(200)
      .json({response})
}


//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
