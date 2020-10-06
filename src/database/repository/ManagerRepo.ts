import { InternalError } from "../../core/ApiError";
import Logger from "../../core/Logger";
import managerSchema from "../../routes/v1/manager/managerSchema";
import Manager, { ManagerModel } from "../model/Manager";
import Role, { RoleCode, RoleModel } from "../model/Role";
import RoleRepo from "./RoleRepo";
import { Types } from "mongoose";

export class ManagerRepo {
  //findbyId()
  public static async findByMobileNumber(
    mobile_number: string
  ): Promise<Manager> {
    return await ManagerModel.findOne({ mobile_number }).lean<Manager>().exec();
  }
  public static async create(
    manager: Manager,
    roleCode: RoleCode[]
  ): Promise<Manager> {
    const now = new Date();
    manager.createdAt = manager.updatedAt = now;
    manager.roles = [];
    for (const rc of roleCode) {
      let role = await RoleRepo.findByRoleCode(rc);
      if (!role) throw new InternalError(`Role ${roleCode} not defined`);
      manager.roles.push(role._id);
    }
    const newManager = await ManagerModel.create(manager);
    return newManager.toObject();
  }
  //updateFcmToken(new fcmtoken,)
  //toggleALlowed()
}
