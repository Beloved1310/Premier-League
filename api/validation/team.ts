const Joi = require("joi");

export const teamValidation = {
  create: Joi.object({
    name: Joi.string().required().trim(),
    country: Joi.string().required().trim(),
    founded: Joi.number().required()
  }),
  update: Joi.object({
    name: Joi.string().optional().trim(),
    country: Joi.string().optional().trim(),
    founded: Joi.number().optional()
  }),
};
