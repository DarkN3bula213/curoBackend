import asyncHandler from "../../../../lib/helpers/asyncHandler";
import { ClassModel, IClass, getClassById } from "../classses/class.model";
import { getPayID } from "../../../../lib/utils/getPayID";
import { PaymentModel } from "./payment.model";
import { BadRequestError, SuccessResponse } from "../../../../lib/api";
import { PaymentHistory, Student } from "../students/student.model";
import { calculateFee } from "../../../../lib/utils/calculateFee";
import { Logger } from "../../../../lib/logger/logger";
import mongoose, { Types } from "mongoose";
import paymentService from "./payment.service";
const logger = new Logger(__filename);

export const registerPayment = asyncHandler(async (req, res) => {
  const { studentId } = req.body;
  const payId = getPayID();

  const id = new Types.ObjectId(studentId);
  const student = await Student.findById(id);

  if (!student) {
    throw new BadRequestError("Student not found");
  }
  const classDoc = await ClassModel.findById(student.classId);
  if (!classDoc) {
    throw new BadRequestError("Class not found");
  }
  const amount = calculateFee(classDoc.fee, student.feeType);
  const newPayment = new PaymentModel({
    studentId: student._id,
    classId: classDoc._id,
    payID: payId,
    amount: amount,
  });
  const payment = await newPayment.save();

  // Update Student Document with Payment History
  const paymentHistoryEntry: PaymentHistory = {
    paymentId: payment._id,
    payID: payId,
    paid: true,
  };

  student.paymentHistory.push(paymentHistoryEntry);
  await student.save();

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
  const { id } = req.params;
  const deletedPayment = await PaymentModel.findOneAndDelete({ _id: id });
  return new SuccessResponse(
    "Payment deleted successfully",
    deletedPayment
  ).send(res);
});
