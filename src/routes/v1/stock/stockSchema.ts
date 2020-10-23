import Joi from "@hapi/joi";

export default {
  new: Joi.object().keys({
    item_code: Joi.string().required(),
    qty: Joi.number().required(),
    weight: Joi.number().required(),
    piece: Joi.number().required(),
    packingsize: Joi.number().required(),
    noOfBags: Joi.number().required(),
    unit_code: Joi.string().required(),
  }),
  fetchByUnitCode: Joi.object().keys({
    unit_code: Joi.string().required(),
  }),
};
