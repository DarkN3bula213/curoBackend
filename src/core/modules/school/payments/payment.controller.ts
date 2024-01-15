import asyncHandler from "../../../../lib/helpers/asyncHandler";
import { ClassModel } from "../classses/class.model";
import { getPayID } from "../../../../lib/utils/getPayID";
import { PaymentModel } from "./payment.model";
import { BadRequestError, SuccessResponse } from "../../../../lib/api";
import { Student } from "../students/student.model";
import { calculateFee } from "../../../../lib/utils/calculateFee";

export const registerPayment = asyncHandler(async (req, res) => {
  const { studentId, classId, feeType } = req.body;
  const payId = getPayID();
  const student = await Student.findById(studentId);
  if (!student) {
    return new BadRequestError("Student not found");
  }
  const classDoc = await ClassModel.findById(classId);
  if (!classDoc) {
    return new BadRequestError("Class not found");
  }
  const amount = calculateFee(classDoc.fee, feeType);
  const newPayment = new PaymentModel({
    studentId,
    classId,
    payId,
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
