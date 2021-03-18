const Joi = require('joi');

export const PaginationSchema = Joi.object({
    limit: Joi.string().min(1).max(100).required(),
    offset: Joi.string().min(0).require()
})