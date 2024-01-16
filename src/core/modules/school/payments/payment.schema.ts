import Joi from "joi";

export default {
    register: Joi.object().keys({
        studentId: Joi.string().required(),
    }),
    bulk: Joi.object().keys({
        studentIds: Joi.array().items(Joi.string().required()).required(),
    
    }),
    getPaymentsByClassId: Joi.object().keys({
        classId: Joi.string().required(),
    }),
    removePayment: Joi.object().keys({
        id: Joi.string().required(),
    }),
}


const paymentEntrySchema = Joi.object({
  studentId: Joi.string().required() 
});

export const insertMany = Joi.array().items(paymentEntrySchema);