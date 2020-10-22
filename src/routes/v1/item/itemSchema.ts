import Joi from "@hapi/joi";

export default {
  new: Joi.object().keys({
    item_name: Joi.string().required().max(100),
    item_code: Joi.string().required(),
    packaging_size: Joi.number().required(),
    per_piece_weight: Joi.number().required(),
    total_box_weight: Joi.number(),
  }),
};
