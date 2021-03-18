const Joi = require('joi');

export const UserSchema = Joi.object({
    full_name: Joi.string().required(),
    gender:Joi.string().valid('male', 'female'),
    utype:Joi.string().valid('doctor','patient'),
    age:Joi.number(),
    experience:Joi.number().max(100),
    education:Joi.string().allow(null, ''),
    licence_no:Joi.string(),
    physical_handicapped:Joi.boolean(),
    password: Joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().required()
})