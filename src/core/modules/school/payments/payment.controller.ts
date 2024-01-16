import asyncHandler from "../../../../lib/helpers/asyncHandler";
import { ClassModel } from "../classses/class.model";
import { getPayID } from "../../../../lib/utils/getPayID";
import { PaymentModel } from "./payment.model";
import { BadRequestError, SuccessResponse } from "../../../../lib/api";
import { Student } from "../students/student.model";
import { calculateFee } from "../../../../lib/utils/calculateFee";
import { Logger } from "../../../../lib/logger/logger";
import { Types } from "mongoose";
const logger = new Logger(__filename);
export const registerPayment = asyncHandler(async (req, res) => {
  const { studentId } = req.body;
  const payId = getPayID();


  logger.warn(`payId: ${payId}`);
  logger.warn(`studentId: ${studentId}`);

  const id = new Types.ObjectId(studentId);
  const student = await Student.findById(id );

  logger.debug(`student: ${student}`);
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
    classId:classDoc._id,
    payID: payId,
    amount: amount,
  });
  const payment = await newPayment.save();
  return new SuccessResponse("Payment created successfully", payment).send(res);
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
