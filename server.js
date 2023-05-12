import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import session from "express-session"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import passport from "passport";
import passportSetup from "../Food-Ordering-App/passport.js";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

app.use(session({
  secret: "9152",
  resave: false,
  saveUninitialized: false
}));

//middelwares
app.use(cors({credentials:true}));
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize())
app.use(passport.session())

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
