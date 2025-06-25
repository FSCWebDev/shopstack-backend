module.exports = (req, res, next) => {
  const { user } = req.session;

  if (user.role !== "admin") {
    req.status(403).send("Unauthorized user");
  }

  next();
};
