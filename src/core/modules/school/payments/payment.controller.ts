import asyncHandler from "../../../../lib/helpers/asyncHandler";
import { ClassModel, IClass, getClassById } from "../classses/class.model";
import { getPayID } from "../../../../lib/utils/getPayID";
import { PaymentModel } from "./payment.model";
import { BadRequestError, SuccessResponse } from "../../../../lib/api";


import { Logger } from "../../../../lib/logger/logger";

import paymentService from "./payment.service";
 
const logger = new Logger(__filename);

export const registerPayment = asyncHandler(async (req, res) => {
  const { studentId } = req.body;

  const payment = await paymentService.addSinglePayment(studentId);
  return new SuccessResponse("Payment created successfully", payment).send(res);
});

export const registerBulkPayments = asyncHandler(async (req, res) => {
  const { studentIds } = req.body;

  // Check if studentIds is an array and not empty
  if (!Array.isArray(studentIds) || studentIds.length === 0) {
    throw new BadRequestError("studentIds must be a non-empty array");
  }
  try {
    const paymentsData = await paymentService.gatherPaymentData(studentIds);
    const payments = await paymentService.insertBulkPayments(paymentsData);
    await paymentService.updateStudentsPaymentHistory(payments);
    return new SuccessResponse(
      "Bulk payments registered successfully",
      payments
    ).send(res);
  } catch (error) {
    logger.error(error);
    throw new BadRequestError("Error registering bulk payments");
  }
});

export const getPayments = asyncHandler(async (req, res) => {
  const payments = await PaymentModel.find().lean().exec();
  return new SuccessResponse("Payments fetched successfully", payments).send(
    res
  );
});

export const getPaymentsByClassId = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const payments = await PaymentModel.find({ classId }).lean().exec();
  return new SuccessResponse("Payments fetched successfully", payments).send(
    res
  );
});

export const removePayment = asyncHandler(async (req, res) => {
  const { studentId, payID } = req.body;
  if (!studentId || !payID) throw new BadRequestError("Invalid params");
  const deletedPayment = await paymentService.removePayment(studentId, payID);
  return new SuccessResponse(
    "Payment deleted successfully",
    deletedPayment
  ).send(res);
});
