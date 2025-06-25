const Users = require("../../models/user.models");

/**
 * Creates user in MongoDB using validatedBody through the request object.
 *
 * @param Request req - Request object sent from Client
 * @param Response res - Response object sent to Client
 * @param Next next - Next function to call next middleware
 * @returns null
 */

module.exports = async (req, res, next) => {
  const { user } = req.session;

  // Creation of user in database
  try {
    const createdUser = await Users.create(user);
    user["id"] = createdUser._id;
  } catch (err) {
    err.status = 403;
    return next(err);
  }
  next();
};
