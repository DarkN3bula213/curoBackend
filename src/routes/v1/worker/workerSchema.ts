import Joi from "@hapi/joi";
import { join } from "path";

export default {
  new: Joi.object().keys({
    unit_id: Joi.string().required(),
    aadhar_number: Joi.string().required(),
    name: Joi.string().required(),
    shift: Joi.string().required(),
    mobile_number: Joi.string().required(),
    date_of_join: Joi.number().integer().positive().required(),
  }),
};
