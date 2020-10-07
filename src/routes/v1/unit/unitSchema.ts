import Joi from "@hapi/joi";

export default {
  new: Joi.object().keys({
    name: Joi.string().required(),
    unit_code: Joi.string().required(),
    manager_mn: Joi.string().required(),
    director_mn: Joi.string().required(),
  }),
};
