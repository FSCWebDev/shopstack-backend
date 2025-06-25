const bcrypt = require("bcrypt");

/**
 * Authenticates user based on validatedBody & user from the request object.
 * The user object contains the actual information from the MongoDB.
 * The validatedBody is received from Joi's validation method.
 *
 * @param Request req - Request object received from Client.
 * @param Response res - Response object received from Client.
 * @param Next next - Next function.
 * @returns void
 */

module.exports = async function authenticateUser(req, res, next) {
  const { user } = req.session;

  const { hash, password } = user;
  // Handle incorrect password
  const isCorrectPwd = await bcrypt.compare(password, hash);
  if (!isCorrectPwd) {
    req.session.user = {};
    const err = new Error("Wrong Password");
    err.status = 400;
    return next(err);
  }
  delete user.password;

  next();
};
