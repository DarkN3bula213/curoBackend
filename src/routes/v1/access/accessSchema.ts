import Joi from "@hapi/joi";

export default {
  login: Joi.object().keys({
    manager_mn: Joi.string().required(),
  }),
};
