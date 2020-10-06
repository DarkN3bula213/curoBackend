import Joi from "@hapi/joi";

export default {
  new: Joi.object().keys({
    name: Joi.string().required(),
    shift: Joi.string().required().valid("day", "night"),
    mobile_number: Joi.string().required(),
    date_of_join: Joi.string().required(),
  }),
};
