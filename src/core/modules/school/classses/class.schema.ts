import Joi from "joi";
import { create } from "lodash";

export default{
    createClass: Joi.object().keys({
        className: Joi.string().required(),
        section: Joi.array().required(),
        fee: Joi.number().required(),
    }),
    createBulk: Joi.array().items({
        className: Joi.string().required(),
        section: Joi.array().required(),
        fee: Joi.number().required(),
    }).required(),
    update: Joi.object().keys({
       field: Joi.string().required(),
         newVal: Joi.required(),
    }),
}