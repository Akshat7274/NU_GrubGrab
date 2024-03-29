import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = await userModel.findById(decode._id)
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findOne({email:req.user.email});
    if (user.role !== 2) {
      if (user.role === 1 && (user.admin===req.body.outlet || user.admin===req.baseUrl.split("/")[3])){
        next()
      }
      else {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      }
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
