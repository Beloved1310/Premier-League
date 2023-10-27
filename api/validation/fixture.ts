const Joi = require("joi");

export const fixtureValidation = {
  create: Joi.object({
    homeTeam: Joi.string().required().trim(),
    awayTeam: Joi.string().required().trim(),
    kickoffTime: Joi.number().required()
  }),
  update: Joi.object({
    homeTeam: Joi.string().optional().trim(),
    awayTeam: Joi.string().optional().trim(),
    status: Joi.string().optional().trim(),
    kickoffTime: Joi.number().optional()
  }),
};
