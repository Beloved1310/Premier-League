const Joi = require("joi");

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]*)(?=.*[!@#$%^&*_-])(?=.{8,})");
export const userValidation = {
  create: Joi.object({
    fullname: Joi.string().trim(),
    email: Joi.string().email(),
    password: Joi.string().pattern(passwordRegex).max(70).messages({
      "string.pattern.match": '"password" must be stronger',
    }),
  }),
  login: Joi.object({
    email: Joi.string().email(),
    password: Joi.string().pattern(passwordRegex).max(70).messages({
      "string.pattern.match": '"password" must be stronger',
    }),
  })
};
