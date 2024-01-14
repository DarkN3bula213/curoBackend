import { InternalError } from "../../core/ApiError";
import Logger from "../../core/Logger";
import Manager, { ManagerModel } from "../model/Manager";
import Role, { RoleCode, RoleModel } from "../model/Role";
import RoleRepo from "./RoleRepo";
import { Types } from "mongoose";

export class ManagerRepo {
  //findbyId()
  public static async findByMobileNumber(
    mobile_number: string,
    isDirector?: boolean,
    isAdmin?: boolean
  ): Promise<Manager> {
    let query: any = {
      mobile_number,
    };
    if (isDirector) {
      const id = await RoleRepo.findByRoleCode(RoleCode.DIRECTOR);
      if (!id) throw new InternalError(`Role code not found in Manager Repo`);
      query["roles.role"] = { $all: [id._id] };
    }
    if (isAdmin) {
      const admin = await RoleRepo.findByRoleCode(RoleCode.SUPER_ADMIN);
      query["roles.role"] = { $all: [admin._id] };
    }

    return ManagerModel.findOne(query)
      .select("+roles +fcm_token")
      .populate({ path: "roles", match: { status: true } })
      .lean<Manager>()
      .exec();
  }
  public static async fetchAll(): Promise<Manager[]> {
    return ManagerModel.find({}).lean<Manager>().exec();
  }

  public static async create(
    manager: Manager,
    roleCode: RoleCode[],
    fcm_token?: string
  ): Promise<Manager> {
    const now = new Date();
    manager.createdAt = manager.updatedAt = now;
    manager.roles = [];
    if (fcm_token) manager.fcm_token = fcm_token;
    let role;
    for (const rc of roleCode) {
      role = await RoleRepo.findByRoleCode(rc);
      if (!role) throw new InternalError(`Role ${roleCode} not defined`);
      manager.roles.push(role._id);
    }
    const newManager = await ManagerModel.create(manager);
    return newManager.toObject();
  }

  //updateFcmToken(new fcmtoken,)
  public static toggleIsAllowed(
    _id: Types.ObjectId,
    isAllowed: boolean
  ): Promise<any> {
    return ManagerModel.updateOne({ _id }, { $set: { isAllowed } })
      .lean()
      .exec();
  }

  public static async updateFcmToken(
    mobile_number: string,
    fcm_token: string
  ): Promise<any> {
    return ManagerModel.updateOne({ mobile_number }, { $set: { fcm_token } })
      .lean()
      .exec();
  }
}
