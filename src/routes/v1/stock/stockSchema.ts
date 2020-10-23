import Joi from "@hapi/joi";
import { JoiObjectId } from "../../../helpers/validator";

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
  fetchByItemCode: Joi.object().keys({
    item_code: Joi.string().required(),
  }),
  update: Joi.object().keys({
    id: JoiObjectId().required(),
    item_code: Joi.string(),
    qty: Joi.number(),
    weight: Joi.number(),
    piece: Joi.number(),
    packingsize: Joi.number(),
    noOfBags: Joi.number(),
    unit_code: Joi.string(),
  }),
};
