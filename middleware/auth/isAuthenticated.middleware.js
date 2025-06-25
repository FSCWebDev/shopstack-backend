module.exports = (req, res, next) => {
  const { user } = res.session;

  if (!user) {
    const err = new Error("Unauthenticated user");
    err.status = 403;
    return next(err);
  }

  next();
};
