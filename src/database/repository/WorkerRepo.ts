import Worker, { WorkerModel } from "../model/Worker";

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
  //updateWorker();
  //getWorkerById();
  public static findByMobileNumber(mobile_number: string): Promise<Worker> {
    return WorkerModel.findOne({ mobile_number })
      .select("+unit_id")
      .lean<Worker>()
      .exec();
  }
}
