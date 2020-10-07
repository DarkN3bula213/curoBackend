import Attendence, { AttendenceModel } from "../model/Attendence";

export default class AttendenceRepo {
  public static async create(attendence: Attendence): Promise<Attendence> {
    const now = new Date();
    attendence.createdAt = attendence.updatedAt = now;
    const att = await AttendenceModel.create(attendence);
    return att.toObject();
  }
  // fetchAttendenceByDate(start, end);
}
