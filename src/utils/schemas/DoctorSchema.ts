const Joi = require('joi');

export const DoctorSchema = Joi.object({
    full_name: Joi.string().required().min(3).max(15),
    gender:Joi.string().valid('male', 'female'),
    experience:Joi.number().min(0).max(100),
    education:Joi.string().allow(null, ''),
    licence_no:Joi.string().allow(null, ''),
    password: Joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email({ tlds: { allow: false } }).required()
})

export const DoctorUpdateSchema = Joi.object({
    full_name: Joi.string().optional().min(3).max(15),
    gender:Joi.string().valid('male', 'female').optional(),
    experience:Joi.number().min(0).max(100).optional(),
    education:Joi.string().allow(null, '').optional(),
    licence_no:Joi.string().allow(null, '').optional(),
})