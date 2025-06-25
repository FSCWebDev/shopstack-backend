module.exports = (req, res, next) => {
  const { user } = res.session;

  if (!user) {
    res.status(403).send("Unauthorized user");
    return;
  }

  next();
};
