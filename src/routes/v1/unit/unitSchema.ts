import Joi from "@hapi/joi";
import { JoiObjectId } from "../../../helpers/validator";

export default {
  new: Joi.object().keys({
    name: Joi.string().required(),
    unit_code: Joi.string().required(),
    manager_mn: Joi.string().required(),
    director_mn: Joi.string().required(),
  }),
  update: Joi.object().keys({
    name: Joi.string(),
    unit_code: Joi.string().required(),
    manager_mn: Joi.string(),
    director_mn: Joi.string(),
  }),
  fetchById: Joi.object().keys({
    _id: JoiObjectId().required(),
  }),
  fetchByManager: Joi.object().keys({
    manager_mn: Joi.string().required(),
  }),
  fetchByDirector: Joi.object().keys({
    director_mn: Joi.string().required(),
  }),
};
