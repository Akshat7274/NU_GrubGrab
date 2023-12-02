import userModel from "../models/userModel.js";
import orderModel from "../models/nescafe/orderModel.js";
import nodemailer from "nodemailer";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import Otp from "../models/otp.js";
import Webb from "../models/JWT.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    //validations
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (password.length < 6) {
      return res.send({ error: "Password has to more than 6 characters" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (phone.length < 10) {
      return res.send({ error: "Phone no has to be of 10 digits" });
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
      password: hashedPassword,
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
      message: "Error in Registeration",
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
        message: "Email is not registered",
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
      expiresIn: "30m",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
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

export const emailSend = async (req, res) => {
  const data = await User.findOne({ email: req.body.email });
  const responseType = {};
  if (data) {
    var randOtp = Math.random();
    while (randOtp < 0.1) {
      randOtp = Math.random();
    }
    let otpcode = Math.floor(randOtp * 10000);
    let find = await Otp.findOne({ email: req.body.email });
    if (find) {
      find.code = otpcode;
      find.expireIn = new Date().getTime() + 300 * 1000;
      find.save();
    } else {
      let otpData = new Otp({
        email: req.body.email,
        code: otpcode,
        expireIn: new Date().getTime() + 300 * 1000,
      });
      console.log(otpData);
      let otpResponse = await otpData.save();
    }
    responseType.statusText = "Success";
    mailer(req.body.email, otpcode);
    responseType.message = "Please check your email id for OTP";
  } else {
    responseType.statusText = "Error";
    responseType.message = "Email id doesn't exist";
  }
  res.status(200).json({ responseType });
};

const mailer = (email, otp) => {
  // var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nugrubgrab@gmail.com",
      pass: "twsszprgcsuwvzwc",
    },
    tls: { rejectUnauthorized: false },
  });

  var mailOptions = {
    from: "nugrubgrab@gmail.com",
    to: email,
    subject: "OTP from NU GrubGrab",
    text: "Thank you\nHere is your OTP: " + otp,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const changePassword = async (req, res) => {
  let fnd = await Otp.find({ email: req.body.email, code: req.body.otpcode });
  let data = fnd[0];
  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      response.message = "Token expired";
      response.statusText = "error";
    } else {
      let user = await User.findOne({ email: req.body.email });
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      user.password = hashedPassword;
      user.save();
      response.message = "Password Changed Successfully";
      response.statusText = "Success";
      response.redir = "/login";
    }
  } else {
    response.message = "Invalid OTP";
    response.statusText = "error";
  }
  res.status(200).json({ response });
};

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
    const { name, email, password, phone } = req.body;
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
      message: "Error While Getting Orders",
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
      message: "Error While Getting Orders",
      error,
    });
  }
};

//JWT Mongo
export const blaclistController = async (req, res) => {
  try {
    const token_new = req.body.token;
    const decode = JWT.verify(token_new, process.env.JWT_SECRET);
    const exp_new = decode.exp;
    console.log(typeof exp_new);
    const invalidate = await new Webb({
      JWT: token_new,
      expireIn: exp_new,
    });
    invalidate.save();
    res.status(200).send("BlackListed");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
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
      message: "Error While Updating Order",
      error,
    });
  }
};
