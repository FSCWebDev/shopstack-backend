const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userValidator = require("./validators/user.validator");
const Users = require("./models/user.models");

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

app.post("/register", async (req, res) => {
  // Validation through server side
  const { value, error } = userValidator.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Process password, turn to hash.
  try {
    const hash = await bcrypt.hash(value.password, 10);
    value.hash = hash;
    delete value.password;
  } catch (err) {
    res.status(500).send("User process failed.");
    return;
  }

  // Creation of user in database
  try {
    const user = await Users.create(value);
    value["id"] = user._id;
  } catch (err) {
    res.status(400).send(err.message);
    return;
  }
  res.json(value);
});

app.post("/login", async (req, res) => {
  // Validation through server side
  const { value, error } = userValidator.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Query database for user
  const { email, password } = value;
  const user = await Users.findOne({ email });
  value["id"] = user._id;
  // Handle no user
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  // Handle incorrect password
  const isCorrectPwd = await bcrypt.compare(password, user.hash);
  if (!isCorrectPwd) {
    res.status(400).send("Wrong password");
    return;
  }

  // Logic for initiating a user session.
  res.json(value);
});

app.delete("/user/:id", async (req, res) => {
  console.log(req.params.id);
  // Validation through server side
  const { value, error } = userValidator.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Query database for user
  const { email, password } = value;
  const user = await Users.findOne({ email });
  // Handle no user
  if (!user) {
    res.status(404).send("Admin not found");
    return;
  }
  // Handle incorrect password
  const isCorrectPwd = await bcrypt.compare(password, user.hash);
  if (!isCorrectPwd) {
    res.status(400).send("Wrong password");
    return;
  }

  // Handles unauthorized user
  if (
    user.role !== "admin" ||
    user._id ===
      req.params
        .id /* && req.headers['authorization'] !== process.env.ADMIN_TOKEN*/
  ) {
    res.status(403).send("User is not authorized");
    return;
  }

  const deletedUser = await Users.deleteOne({ _id: user._id });
  if (!deletedUser) {
    res.status(404);
    return;
  }
  res.send("User was deleted Successfully");
  return;
});

app.listen(4000, () => {
  console.log("SERVER HAS STARTED ON PORT 4000");
});
