const Joi = require('joi');

export const PatientSchema = Joi.object({
    full_name: Joi.string().required().min(3).max(15),
    gender:Joi.string().valid('male', 'female').required(),
    age:Joi.number().strict().required(),
    physical_handicapped:Joi.boolean().required().strict(),
    password: Joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email({ tlds: { allow: false } }).required()
})

export const PatientUpdateSchema = Joi.object({
    full_name: Joi.string().min(3).max(15).required(),
    gender:Joi.string().valid('male', 'female').required(),
    age:Joi.number().strict().required(),
    physical_handicapped:Joi.boolean().required().strict(),
})