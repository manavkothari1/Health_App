const Joi = require('joi');

export const UserSchema = Joi.object({
    full_name: Joi.string().required().min(3).max(15),
    gender:Joi.string().valid('male', 'female'),
    utype:Joi.string().valid('doctor','patient'),
    age:Joi.number().when('utype', { is: 'patient', then: Joi.required() }),
    experience:Joi.number().min(0).max(100),
    education:Joi.string().allow(null, ''),
    licence_no:Joi.string().allow(null, ''),
    physical_handicapped:Joi.boolean().when('utype', { is: 'patient', then: Joi.required()}),
    password: Joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email().required()
})