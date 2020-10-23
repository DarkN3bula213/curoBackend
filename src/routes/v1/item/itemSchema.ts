import Joi from "@hapi/joi";
import { JoiObjectId } from "../../../helpers/validator";

export default {
  new: Joi.object().keys({
    item_name: Joi.string().required().max(100),
    item_code: Joi.string().required(),
    packaging_size: Joi.number().required(),
    per_piece_weight: Joi.number().required(),
    total_box_weight: Joi.number(),
  }),
  update: Joi.object().keys({
    item_name: Joi.string().max(100),
    item_code: Joi.string().required(),
    packaging_size: Joi.number(),
    per_piece_weight: Joi.number(),
    total_box_weight: Joi.number(),
  }),
  removeById: Joi.object().keys({
    _id: JoiObjectId().required(),
  }),
  fetchByItemCode: Joi.object().keys({
    item_code: Joi.string().required(),
  }),
};
