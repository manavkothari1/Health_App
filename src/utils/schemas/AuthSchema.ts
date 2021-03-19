const Joi = require('joi');

export const AuthSchema = Joi.object({
    email: Joi.string().required(),
    password:Joi.string().required(),
})