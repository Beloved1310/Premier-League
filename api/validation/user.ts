const Joi = require("joi");

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]*)(?=.*[!@#$%^&*_-])(?=.{8,})");
export const userValidation = {
  create: Joi.object({
    fullname: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(passwordRegex).max(70).messages({
      "string.pattern.base": "Password must contain a capital/small letter, symbol and number",
      "string.pattern.match": '"password" must be stronger',
    }).required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(passwordRegex).max(70).messages({
      "string.pattern.match": '"password" must be stronger',
    }).required(),
  })
};