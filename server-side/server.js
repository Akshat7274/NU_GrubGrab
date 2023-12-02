import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import session from "express-session"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import nescafeCategoryRoutes from "./routes/nescafe/categoryRoutes.js";
import nescafeProductRoutes from "./routes/nescafe/productRoutes.js";
import tmpCategoryRoutes from "./routes/tmp/categoryRoutes.js";
import tmpProductRoutes from "./routes/tmp/productRoutes.js";
import ssCategoryRoutes from "./routes/silver-spoon/categoryRoutes.js";
import ssProductRoutes from "./routes/silver-spoon/productRoutes.js";
import agCategoryRoutes from "./routes/apno-gaon/categoryRoutes.js";
import agProductRoutes from "./routes/apno-gaon/productRoutes.js";
import cors from "cors";
import passport from "passport";
import passportSetup from "./passport.js";

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
app.use("/api/v1/nescafe/category", nescafeCategoryRoutes);
app.use("/api/v1/nescafe/product", nescafeProductRoutes);
app.use("/api/v1/tmp/category", tmpCategoryRoutes);
app.use("/api/v1/tmp/product", tmpProductRoutes);
app.use("/api/v1/silver-spoon/category", ssCategoryRoutes);
app.use("/api/v1/silver-spoon/product", ssProductRoutes);
app.use("/api/v1/apno-gaon/category", agCategoryRoutes);
app.use("/api/v1/apno-gaon/product", agProductRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to NU Grub Grab!!</h1>");
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
