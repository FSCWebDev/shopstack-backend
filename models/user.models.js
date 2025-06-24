const { Schema, model } = require("mongoose");

const userSchema = Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  name: { type: String, required: true },
  hash: { type: String, required: true },
  role: {
    type: String,
    enum: ["customer", "admin", "vendor"],
    default: "customer",
  },
});

const Users = model("users", userSchema);

module.exports = Users;
