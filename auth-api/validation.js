const Joi = require("joi");

const registerValidation = (body) => {
  const schema = Joi.object({
    fullName: Joi.string().min(6).required(),
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  });
  return ({ error } = schema.validate(body));
};

const loginValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  });
  return ({ error } = schema.validate(body));
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
