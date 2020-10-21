import Joi from "@hapi/joi";

export default {
  new: Joi.object().keys({
    unit_id: Joi.string().required(),
    aadhar_number: Joi.string().required(),
    name: Joi.string().required(),
    shift: Joi.string().required(),
    mobile_number: Joi.string().required(),
    date_of_join: Joi.number().integer().positive().required(),
  }),
  findAllByUnitId: Joi.object().keys({
    unit_id: Joi.string().required(),
  }),
  updateWorker: Joi.object().keys({
    unit_id: Joi.string(),
    aadhar_number: Joi.string(),
    name: Joi.string(),
    shift: Joi.string(),
    mobile_number: Joi.string().required(),
    date_of_join: Joi.number().integer().positive(),
  }),
};
