import Manager, { ManagerModel } from "../model/Manager";

export class ManagerRepo {
  //findbyId()
  public static async findByMobileNumber(
    mobile_number: string
  ): Promise<Manager> {
    return await ManagerModel.findOne({ mobile_number }).lean<Manager>().exec();
  }
  public static async create(
    name: string,
    shift: string,
    mobile_number: string,
    date_of_join: string
  ): Promise<Manager> {
    const now = new Date();
    const newManager = await ManagerModel.create({
      name,
      shift,
      mobile_number,
      date_of_join,
      createdAt: now,
      updatedAt: now,
    });
    return newManager.toObject();
  }
  //updateFcmToken(new fcmtoken,)
  //toggleALlowed()
}
