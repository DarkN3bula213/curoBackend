import Joi from "joi";

export default {
  newStudent: Joi.object().keys({
    registration_no: Joi.string().required(),
    classId: Joi.string().required(),
    section: Joi.string().required(),
    name: Joi.string().required(),
    gender: Joi.string().required(),
    father_name: Joi.string().optional(),
    dob: Joi.date().optional(),
    address: Joi.string().optional(),
    phone: Joi.number().optional(),
    feeType: Joi.string().optional(),
  }),
  bulkPost: Joi.array()
    .items({
      registration_no: Joi.string().required(),
        classId: Joi.string().required(),
        section: Joi.string().required(),
        
    })
    .required(),
};