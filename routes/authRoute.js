import express from "express";
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
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import passport from "passport";

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

router.get("/login/success",(req,res) => {
  if(req.user) {
    res.status(200).json({
      error: false,
      message: "Succesfully Logged In",
      user: req.user,
    })
  }
  else{
    res.status(403).json({error:true,message:"Not Authorized"})
  }
})

router.get("/login/failed", (req,res) => {
  res.status(401).json({
    error:true,
    message:"Log in failure"
  })
})

router.get("/google/callback", passport.authenticate("google",{
  successRedirect: "http://localhost:3000",
  failureRedirect: "/login/failed",
}))

router.get("/google", passport.authenticate("google",["profile","email"]))

router.get("/logout", (req,res) => {
  req.logout();
  res.redirect("http://localhost:3000")
})
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

export default router;
