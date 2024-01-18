import Joi from "joi";


export default {
    userInput: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
    roleInput: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
    }),
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
     
}