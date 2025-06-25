module.exports = (req, res, next) => {
  const { user } = req.session;

  if (user.role !== "admin") {
    const err = new Error("Unauthorized user");
    err.status = 403;
    return next(err);
  }

  next();
};
