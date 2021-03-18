const Joi = require('joi');

export const IdSchema = Joi.object({
    id: Joi.integer().min(1).required()
})