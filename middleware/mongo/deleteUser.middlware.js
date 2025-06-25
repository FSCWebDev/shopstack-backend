const Users = require("../../models/user.models");

module.exports = async function deleteUser(req, res, next) {
  const { user } = req.session;

  // Handles deletion of user from database.
  const deletedUser = await Users.deleteOne({ _id: user._id });
  if (!deletedUser) {
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }

  next();
};
