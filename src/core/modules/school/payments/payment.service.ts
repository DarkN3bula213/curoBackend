import { calculateFee } from "..//../../../lib/utils/calculateFee";
import { ClassModel } from "../classses/class.model";
import { Student } from "../students/student.model";
import { getPayID } from "..//../../../lib/utils/getPayID";
import { PaymentModel } from "./payment.model";
import { BadRequestError } from "../../../../lib/api";
import mongoose from "mongoose";
import { Logger } from "../../../../lib/logger/logger";
const logger = new Logger(__filename);
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
          payID: payId,
          amount: amount,
        });
      }

      return paymentsData;
    } catch (error) {
      logger.error(error.message);
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
      logger.error(error.message);
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
      logger.error(error.message);
      throw new BadRequestError(error.message);
    }
  }
  async addSinglePayment(studentId: string): Promise<any> {
    const payId = getPayID();
    const student = await this.student.findById(studentId);

    const classDoc = await this.classModel.findById(student.classId);

    const amount = calculateFee(classDoc.fee, student.feeType);

    const newPayment = new PaymentModel({
      studentId: student._id,
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
  }

  async removePayment(payID: string, studentId: string): Promise<void> {
       await PaymentModel.findOneAndDelete({ payID, studentId });

       await this.student.findByIdAndUpdate(studentId, {
         $pull: { paymentHistory: { payID } },
       });
  }
}

export default new paymentService(Student, ClassModel);
