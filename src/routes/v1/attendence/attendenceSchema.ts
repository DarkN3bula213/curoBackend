import Joi from "@hapi/joi";

export default {
  new: Joi.object().keys({
    worker_mn: Joi.string().required(),
    year: Joi.number().required().positive(),
    month: Joi.number().required().min(1).max(12),
    date: Joi.number().min(1).max(31).required(),
    inTime: Joi.string().required(),
  }),
};
