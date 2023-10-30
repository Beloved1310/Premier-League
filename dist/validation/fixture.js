"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixtureValidation = void 0;
const Joi = require('joi');
exports.fixtureValidation = {
    create: Joi.object({
        homeTeam: Joi.string().required().trim(),
        awayTeam: Joi.string().required().trim(),
        kickoffTime: Joi.string().isoDate().required(),
    }),
    update: Joi.object({
        homeTeam: Joi.string().optional().trim(),
        awayTeam: Joi.string().optional().trim(),
        status: Joi.string().optional().trim(),
        result: Joi.string()
            .regex(/^[A-Za-z\s-]+ \d+ - \d+ [A-Za-z\s-]+$/)
            .messages({
            'string.pattern.base': 'Invalid result format. The format should be "Team1 Score - Score Team2".',
        }),
        kickoffTime: Joi.number().optional(),
    }),
};
//# sourceMappingURL=fixture.js.map