import Joi from "@hapi/joi";
import { JoiObjectId } from "../../../helpers/validator";

export default {
  new: Joi.object().keys({
    name: Joi.string().required(),
    unit_code: Joi.string().required(),
    manager_id: JoiObjectId().required(),
    director_id: JoiObjectId().required(),
  }),
};
