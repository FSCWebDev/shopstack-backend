const Joi = require("joi");

const validator = Joi.object({
  email: Joi.string().lowercase().email().required(),
  name: Joi.string().max(30),
  password: Joi.string().invalid("/", "*", ".").required(),
  role: Joi.string().valid("customer", "admin", "vendor").default("customer"),
  user: Joi.string(),
});

module.exports = validator;
