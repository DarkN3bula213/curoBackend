import Attendence, { AttendenceModel } from "../model/Attendence";
import { Types } from "mongoose";
import WorkerRepo from "./WorkerRepo";
import Worker from "../model/Worker";
import { InternalError } from "../../core/ApiError";
import { doc } from "prettier";
import Logger from "../../core/Logger";

export default class AttendenceRepo {
  public static async MarkOut(attn: Attendence): Promise<any> {
    attn.markedOut = true;
    attn.updatedAt = new Date();
    return AttendenceModel.updateOne({ _id: attn._id }, { $set: { ...attn } })
      .lean()
      .exec();
  }
  public static async findByMobileNumberAndDate(
    worker: Worker,
    year: number,
    month: number,
    day: number
  ): Promise<Attendence> {
    return AttendenceModel.findOne({
      worker,
      year,
      month,
      day,
    })
      .populate("worker")
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
      .populate("worker")
      .lean<Attendence>()
      .exec();
  }

  public static async fetchAttendenceByDateRangeAndUnit(
    startDate: Date,
    endDate: Date,
    unit_id: string
  ): Promise<Attendence[]> {
    let Workers = await WorkerRepo.fetchAllByUnitId(unit_id);
    if (!Workers) return;
    Workers = Workers.map((ele) => ele._id);
    return AttendenceModel.find({
      worker: { $in: [...Workers] },
      createdAt: {
        //octal numbers used here with a prefix of 0o
        $gte: new Date(new Date(startDate).setHours(0o00, 0o00, 0o00)),
        $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
      },
    })
      .sort({ createdAt: "asc" })
      .populate("worker")
      .lean<Attendence>()
      .exec();
  }
}
