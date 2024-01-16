import Joi from "joi";

export default {
    register: Joi.object().keys({
        studentId: Joi.string().required(),
    }),
    getPaymentsByClassId: Joi.object().keys({
        classId: Joi.string().required(),
    }),
    removePayment: Joi.object().keys({
        id: Joi.string().required(),
    }),
}