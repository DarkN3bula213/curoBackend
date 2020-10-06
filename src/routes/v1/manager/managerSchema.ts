import Joi from "@hapi/joi";
import { RoleCode } from "../../../database/model/Role";

export default {
  new: Joi.object().keys({
    name: Joi.string().required(),
    shift: Joi.string().required().valid("day", "night"),
    mobile_number: Joi.string().required(),
    date_of_join: Joi.string().required(),
    extraRoles: Joi.array().items(
      Joi.string().valid(RoleCode.DIRECTOR, RoleCode.SUPER_ADMIN).required()
    ),
  }),
  getInfo: Joi.object().keys({
    mobile_number: Joi.string().required(),
  }),
};
