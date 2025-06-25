// Node Module Imports
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

// Routers
const authRouter = require("./routers/auth.routers");
const productRouter = require("./routers/product.routers");

// Middleware
const errorCatcher = require("./middleware/error/errorHandler");

// Configures environment variables
require("dotenv").config({
  path: process.env.NODE_ENV || "./.env.development",
});

const app = express();
mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}/${process.env.MONGO_DB}`
  )
  .then(res => console.log("MONGODB HAS CONNECTED"))
  .catch(console.log);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "somesecret", // Store in environment variables
    cookie: {},
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/auth", authRouter);
app.use("/products", productRouter);

app.use(errorCatcher);

app.listen(4000, () => {
  console.log("SERVER HAS STARTED ON PORT 4000");
});
