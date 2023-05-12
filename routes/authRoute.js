import express from "express";
import userModel from "../models/userModel.js";
import {
  registerController,
  loginController,
  testController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  emailSend,
  changePassword,
  blaclistController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import passport from "passport";
import JWT from "jsonwebtoken";
import Webb from "../models/JWT.js";

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
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//google login

router.get("/login/success", async (req, res) => {
  if (req.user) {
    try {
      const user = await userModel.findOne({ email: req.user._json.email });
      var role = 0;
      if (user && user.role === 1) {
        role = 1;
      } else if (!user) {
        const user = await new userModel({
          name: req.user._json.name,
          email: req.user._json.email,
          role: role,
          password: " ",
          phone: " ",
        }).save();
      }
      const find = await userModel.findOne({ email: req.user._json.email });
      const token = await JWT.sign({ _id: find._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // const isGoogle = true;
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
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

router.post("/user-token", async (req, res) => {
  try {
    const token = req.body.token;
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
