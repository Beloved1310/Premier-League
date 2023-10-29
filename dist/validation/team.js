"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamValidation = void 0;
const Joi = require("joi");
exports.teamValidation = {
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
//# sourceMappingURL=team.js.map