const bcrypt = require("bcrypt");

/**
 * Hashes password recieved from validatedBody through request object.
 *
 * @param Request req - Request object sent from Client.
 * @param Response res - Response object sent to Client.
 * @param Next next - Next function.
 * @returns returns
 */

module.exports = async function hashPassword(req, res, next) {
  const { user } = req.session;

  // Process password, turn to hash.
  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.hash = hash;
  } catch (err) {
    err.status = 500;
    return next(err);
  }

  next();
};
