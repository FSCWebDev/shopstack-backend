const userValidator = require("../../validators/user.validator");

/**
 * Validates user then sends validatedBody through the request object.
 *
 * @param Request req - request object
 * @param Response res - response object
 * @param Next next - next function
 * @returns null
 */

module.exports = function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).send("Body in request not found");
    return;
  }

  // Validation through server side
  const { value, error } = userValidator.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  req.session.user = value;
  next();
};
