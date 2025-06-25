const { Router } = require("express");

// Auth Middleware Imports
const authenticateUser = require("../middleware/auth/authenticateUser");
const authorizeAccess = require("../middleware/auth/authorizeAccess.middleware");

// Mongo Middleware Imports
const createUser = require("../middleware/mongo/createUser.middleware");
const findUser = require("../middleware/mongo/findUser.middleware");
const deleteUser = require("../middleware/mongo/deleteUser.middlware");

// Validator Middlware Imports
const validateUser = require("../middleware/validators/validateUser.middleware");

// Encryption Middlware Imports
const hashPassword = require("../middleware/encryption/hashPassword.middleware");

const router = Router();

router.post("/register", validateUser, hashPassword, createUser, (req, res) => {
  res.send("User successfully created!");
});

router.post(
  "/login",
  validateUser,
  findUser,
  authenticateUser,
  async (req, res) => {
    res.status(200).send("OK");
  }
);

router.post("/logout", (req, res) => {
  console.log("Implement logout feature");
  res.send(401).send("Route not implemented");
});

router.delete(
  "/:id",
  validateUser,
  findUser,
  authenticateUser,
  authorizeAccess,
  deleteUser,
  async (req, res) => {
    res.send("User deleted successfully!");
  }
);

module.exports = router;
