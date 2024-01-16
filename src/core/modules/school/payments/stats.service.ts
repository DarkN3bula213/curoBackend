import { Student } from "../students/student.model";
import { PaymentModel } from "./payment.model";

/**
 *  [-] We will get stats for payment
 *  [-] We will construct a aggregate pipeline for students
 *  [+] Group paid students by classId,
 *  [+] From classId we will get the fee and calculate the total fee for that class
 *
 *  [-] The target collection is the total number of students in a class times the fee for that class
 *  [+] Target collection should be collected by Class and also by Class and Section
 *
 *
 */

class StatsService {
  constructor(
    private student: typeof Student,
    private payment: typeof PaymentModel
  ) {}

  async getStats() {
    const totalStudents = await this.student.countDocuments();
    const totalPayments = await this.payment.countDocuments();
    const totalPaid = await this.payment.countDocuments({ paid: true });
    const totalUnpaid = totalStudents - totalPaid;

    return {
      totalStudents,
      totalPayments,
      totalPaid,
      totalUnpaid,
    };
  }
  async classCollection(classId: string) {
    const payments = await this.payment.aggregate([
      { $match: { classId: classId } },
      {
        $group: {
          _id: "$classId",
          total: { $sum: "$amount" },
        },
      },
    ]);
    const totalPayment = payments.reduce((acc, curr) => acc + curr.total, 0);
    // Group payments by class and section
    const paymentsByClassAndSection = {};
    const paymentsByClass = await this.payment.aggregate([
      {
        $group: {
          _id: { classId: "$classId", section: "$section" },
          total: { $sum: "$amount" },
        },
      },
    ]);
    paymentsByClass.forEach((payment) => {

    });
  }
}
