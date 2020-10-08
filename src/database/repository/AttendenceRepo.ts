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
  // fetchAttendenceByDate(start, end);
}
