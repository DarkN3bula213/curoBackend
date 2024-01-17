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
    private payment: typeof PaymentModel,
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
  async totalCollection() {
    const payments = await this.payment.aggregate([
      { $group: { _id: '$classId', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } },
      { $limit: 5 },
    ]);
    const totalPayment = payments.reduce((acc, curr) => acc + curr.total, 0);

    return totalPayment;
  }
  async getClassStatistics() {
    const paymentStats = await this.payment.aggregate([
      {
        $group: {
          _id: '$classId',
          numberOfPayments: { $sum: 1 },
          amountCollected: { $sum: '$amount' },
        },
      },
      {
        $project: {
          _id: 0,
          classId: '$_id',
          numberOfPayments: 1,
          amountCollected: 1,
        },
      },
    ]);

    return paymentStats;
  }
}

export default new StatsService(Student, PaymentModel);