import { WorkerModel } from "../model/Worker";

export default class WorkerRepo {
  //allWorkers();
  public static async create(
    unit_id: string,
    aadhar_number: string,
    name: string,
    shift: string,
    mobile_number: string,
    date_of_join: number
  ): Promise<Worker> {
    const now = new Date();
    const newWorker = await WorkerModel.create({
      unit_id,
      aadhar_number,
      name,
      shift,
      mobile_number,
      date_of_join,
      createdAt: now,
      updatedAt: now,
    });
    return newWorker.toObject();
  }
  //updateWorker();
  //getWorkerById();
  public static findByMobileNumber(mobile_number: string): Promise<Worker> {
    return WorkerModel.findOne({ mobile_number })
      .select("+unit_id")
      .lean<Worker>()
      .exec();
  }
}
