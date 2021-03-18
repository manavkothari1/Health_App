const Joi = require('joi');

export const IdSchema = Joi.object({
    id: Joi.string().min(1).required()
})