import Attendence, { AttendenceModel } from "../model/Attendence";
import { Types } from "mongoose";

export default class AttendenceRepo {
  public static async findByMobileNumberAndDate(
    worker: Types.ObjectId,
    year: number,
    month: number,
    date: number
  ): Promise<Attendence> {
    return AttendenceModel.findOne({ worker, year, month, date })
      .lean<Attendence>()
      .exec();
  }
  public static async create(attendence: Attendence): Promise<Attendence> {
    const now = new Date();
    attendence.createdAt = attendence.updatedAt = now;
    const att = await AttendenceModel.create(attendence);
    return att.toObject();
  }
  public static async fetchAttendenceByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<Attendence[]> {
    return AttendenceModel.find({
      createdAt: {
        //octal numbers used here with a prefix of 0o
        $gte: new Date(new Date(startDate).setHours(0o00, 0o00, 0o00)),
        $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
      },
    })
      .sort({ createdAt: "asc" })
      .lean<Attendence>()
      .exec();
  }
}
