import express from "express";
import userModel from "../models/userModel.js";

import {
  registerController,
  loginController,
  testController,
  updateProfileController,
  getOrdersController,
  getAgOrdersController,
  getSsOrdersController,
  getTmpOrdersController,
  getNescOrdersController,
  orderStatusController,
  emailSend,
  changePassword,
  blaclistController,
  reviewController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import passport from "passport";
import JWT from "jsonwebtoken";
import Webb from "../models/JWT.js";
import { modelNames } from "mongoose";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", emailSend);

router.post("/changePassword", changePassword);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.post("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//google login

router.get("/login/success", async (req, res) => {
  if (req.user) {
    try {
      const user = await userModel.findOne({ email: req.user._json.email });
      var role = 0;
      var admin = "";
      if (user) {
        role = user.role;
        admin = user.admin;
      } else if (!user) {
        const user = await new userModel({
          name: req.user._json.name,
          email: req.user._json.email,
          role: role,
          admin: admin,
          password: " ",
          phone: " ",
        }).save();
      }
      const find = await userModel.findOne({ email: req.user._json.email });
      const token = await JWT.sign({ _id: find._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // const isGoogle = true;
      console.log(req.user._json)
      res.status(200).json({
        error: false,
        message: "Succesfully Logged In",
        user: req.user,
        token: token,
        isGoogle: "true",
        name: req.user._json.name,
        email: req.user._json.email,
        phone: "",
        _id: req.user.id,
        role: role,
        admin: admin
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed",
  })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
  req.logout();
  // res.redirect("http://localhost:3000")
});

//google logout
router.post("/google/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // res.redirect('/login');
  });
});

router.post("/black", blaclistController);

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.post("/all-orders/apno-gaon", requireSignIn, isAdmin, getAgOrdersController);
router.post("/all-orders/silver-spoon", requireSignIn, isAdmin, getSsOrdersController);
router.post("/all-orders/tmp", requireSignIn, isAdmin, getTmpOrdersController);
router.post("/all-orders/nescafe", requireSignIn, isAdmin, getNescOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

router.put(
  "/review/:orderId",
  requireSignIn,
  reviewController
);

const refresh = async () => {
  try {
    const expired = await Webb.find({ expireIn : { $lt: Number(Date.now() / 1000)}})
    console.log(Number(Date.now() / 1000))
    console.log(expired)
  } catch (error) {
    console.log(error)
  }
}

router.post("/user-token", async (req, res) => {
  try {
    const token = req.body.token;
    // const expired = await Webb.find({ expiresIn : { $lt : moment()}})
    // console.log(expired)
    // await refresh()
    const invalid_check = await Webb.findOne({ JWT: token });
    if (!invalid_check) {
      const decode = JWT.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decode._id);
      res.status(200).json(user);
    }else{
      res.status(400).send("Invalid Token")
    }
  }catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
