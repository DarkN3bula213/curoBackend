import Worker, { WorkerModel } from "../model/Worker";
import { Types } from "mongoose";

export default class WorkerRepo {
  public static async getAllWorkers(): Promise<Worker[]> {
    return WorkerModel.find({}).lean<Worker>().exec();
  }
  public static async create(worker: Worker): Promise<Worker> {
    const now = new Date();
    worker.createdAt = worker.updatedAt = now;
    const newWorker = await WorkerModel.create(worker);
    return newWorker.toObject();
  }
  public static findById(worker_id: Types.ObjectId): Promise<Worker> {
    return WorkerModel.findById(worker_id).lean<Worker>().exec();
  }
  public static async updateWorker(worker: Worker): Promise<any> {
    return WorkerModel.updateOne({ _id: worker._id }, { $set: { ...worker } })
      .lean<Worker>()
      .exec();
  }
  public static async findByMobileNumber(
    mobile_number: string
  ): Promise<Worker> {
    return WorkerModel.findOne({ mobile_number }).lean<Worker>().exec();
  }
  public static async fetchAllByUnitId(unit_id: string): Promise<Worker[]> {
    return WorkerModel.find({ unit_id }).lean<Worker>().exec();
  }
}
