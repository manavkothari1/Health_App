const Joi = require('joi');

export const PatientSchema = Joi.object({
    full_name: Joi.string().required().min(3).max(15),
    gender:Joi.string().valid('male', 'female'),
    age:Joi.number(),
    physical_handicapped:Joi.boolean(),
    password: Joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email({ tlds: { allow: false } }).required()
})

export const PatientUpdateSchema = Joi.object({
    full_name: Joi.string().min(3).max(15).optional(),
    gender:Joi.string().valid('male', 'female').optional(),
    age:Joi.number().optional(),
    physical_handicapped:Joi.boolean().optional(),
})