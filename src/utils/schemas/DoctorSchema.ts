const Joi = require('joi');

export const DoctorSchema = Joi.object({
    full_name: Joi.string().required().min(3).max(15),
    gender:Joi.string().valid('male', 'female'),
    experience:Joi.number().required().min(0).max(100).default(0),
    education:Joi.string().required().allow(null, '').default(''), 
    licence_no:Joi.string().required().allow(null, '').default(''),
    password: Joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email({ tlds: { allow: false } }).required()
})

export const DoctorUpdateSchema = Joi.object({
    full_name: Joi.string().min(3).max(15).required(),
    gender:Joi.string().valid('male', 'female').required(),
    experience:Joi.number().min(0).max(100).required(),
    education:Joi.string().allow(null, '').required(),
    licence_no:Joi.string().allow(null, '').required(),
})