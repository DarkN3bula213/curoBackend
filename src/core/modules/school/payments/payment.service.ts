import { calculateFee } from "..//../../../lib/utils/calculateFee";
import { ClassModel } from "../classses/class.model";
import { Student } from "../students/student.model";
import { getPayID } from "..//../../../lib/utils/getPayID";
import { IPayment, PaymentModel } from "./payment.model";
import { BadRequestError } from "../../../../lib/api";
import mongoose, { Types } from "mongoose";
import { Logger as log } from "../../../../lib/logger/logger";
const Logger = new log(__filename);
interface PaymentData {
  studentId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  payID: string;
  amount: number;
}

class paymentService {
  constructor(
    private student: typeof Student,
    private classModel: typeof ClassModel
  ) {}

  async gatherPaymentData(studentIds: string[]): Promise<PaymentData[]> {
    const paymentsData = [];
    try {
      for (const studentId of studentIds) {
        const student = await this.student.findById(studentId);
        if (!student) continue; // Skip if student not found

        const classDoc = await this.classModel.findById(student.classId);
        if (!classDoc) continue; // Skip if class not found

        const amount = calculateFee(classDoc.fee, student.feeType);
        const payId = getPayID();

        paymentsData.push({
          studentId: student._id,
          classId: classDoc._id,
          className: classDoc.className,
          section: student.section,
          payID: payId,
          amount: amount,
        });
      }

      return paymentsData;
    } catch (error) {
      Logger.error(error.message);
      throw new BadRequestError(error.message);
    }
  }
  async updateStudentsPaymentHistory(payments: any[]) {
    try {
      for (const payment of payments) {
        const paymentHistoryEntry = {
          paymentId: payment._id,
          payID: payment.payID,
          paid: true,
        };

        await this.student
          .findByIdAndUpdate(payment.studentId, {
            $push: { paymentHistory: paymentHistoryEntry },
          })
          .exec();
      }
    } catch (error) {
      Logger.error(error.message);
      throw new BadRequestError(error.message);
    }
  }
  async insertBulkPayments(
    paymentsData: PaymentData[]
  ): Promise<PaymentData[]> {
    try {
      const payments = await PaymentModel.insertMany(paymentsData);
      return payments;
    } catch (error) {
      Logger.error(error.message);
      throw new BadRequestError(error.message);
    }
  }
  async addSinglePayment(studentId: Types.ObjectId): Promise<any> {
    const id = new mongoose.Types.ObjectId(studentId);
    console.log("studentId", studentId, "id", id);
    try {
      const payId = getPayID();
      const student = await this.student.findOne({
        _id: studentId,
      });
      console.log("student", student);
      if (!student) {
        throw new BadRequestError("Student not found");
      }

      const classDoc = await this.classModel.findById(student.classId);
      if (!classDoc) {
        throw new BadRequestError("Class not found");
      }

      const amount = calculateFee(classDoc.fee, student.feeType);
      console.log(
        "amount",
        amount,
        "classDoc.fee",
        classDoc.fee,
        "student.feeType",
        student.feeType
      );
      const newPayment: IPayment = new PaymentModel({
        studentId: student._id,
        className: classDoc.className,
        section: student.section,
        classId: classDoc._id,
        payID: payId,
        amount: amount,
      });

      const payment = await newPayment.save();

      const paymentHistoryEntry = {
        paymentId: payment._id,
        payID: payment.payID,
        paid: true,
      };
      await this.student
        .findByIdAndUpdate(payment.studentId, {
          $push: { paymentHistory: paymentHistoryEntry },
        })
        .exec();
      return payment;
    } catch (error) {
      Logger.error(error.message);
      throw new BadRequestError(error.message);
    }
  }

  async removePayment(studentId: string, payID: string): Promise<void> {
    const payment = await PaymentModel.findOneAndDelete({ payID, studentId });
    if (!payment) {
      throw new BadRequestError("Payment not found");
    } else {
      Logger.info("Payment deleted successfully");
    }

    const student = await this.student.findByIdAndUpdate(studentId, {
      $pull: { paymentHistory: { payID } },
    });
    if (!student) {
      throw new BadRequestError("Student not found");
    } else {
      Logger.info("Student payment history updated successfully");
    }
  }
}

export default new paymentService(Student, ClassModel);
