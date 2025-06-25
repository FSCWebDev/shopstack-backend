const Users = require("../../models/user.models");

/**
 * Finds user from MongoDB using validatedBody from request object.
 *
 * @param Request req - Request object received from the Client.
 * @param Response res - Response object received from the Client.
 * @param Next next - Next function.
 * @returns void
 */

module.exports = async function findUser(req, res, next) {
  const { user } = req.session;

  // Query database for user
  const { email } = user;
  const foundUser = await Users.findOne({ email });
  // Handle no user
  if (!foundUser) {
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }
  foundUser.password = user.password;
  req.session.user = foundUser;

  next();
};
