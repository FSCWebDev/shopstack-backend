const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send(401).send("Unimplemented error");
});

module.exports = router;
