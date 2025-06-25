/**
 * Authorizes access to a part of the server.
 * Uses the session object for the user, along with id parameters in the routing.
 *
 * @param Request req - Request received from the Client.
 * @param Response res - Response received to the Client.
 * @param Next next - Next function.
 * @returns void
 */

module.exports = async function (req, res, next) {
  const { user } = req.session;
  if (user.role !== "admin") {
    if (user.id === req.params.id) {
      return next();
    } else {
      const err = new Error("Unauthorized access");
      err.status = 403;
      return next(err);
    }
  }

  next();
};
