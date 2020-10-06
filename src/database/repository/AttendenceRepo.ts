import Attendence, { AttendenceModel } from "../model/Attendence";
import Worker from "../model/Worker";

export default class AttendenceRepo {
  public static async create(
    worker: Worker,
    inTime: number,
    outTime: number
  ): Promise<Attendence> {
    const now = new Date();
    const att = await AttendenceModel.create({
      worker,
      inTime,
      outTime,
      createdAt: now,
      updatedAt: now,
    });
    return att.toObject();
  }
  // fetchAttendenceByDate(start, end);
}
