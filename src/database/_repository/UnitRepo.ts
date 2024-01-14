import Unit, { UnitModel } from "../model/Unit";
import { Types } from "mongoose";
import Manager from "../model/Manager";
import { InternalError } from "../../core/ApiError";
import RoleRepo from "./RoleRepo";
import { RoleCode } from "../model/Role";
export default class UnitRepo {
  public static async findByUnitCode(unit_code: string): Promise<Unit> {
    return UnitModel.findOne({ unit_code })
      .populate("manager")
      .lean<Unit>()
      .exec();
  }
  public static async fetchAll(): Promise<Unit[]> {
    return UnitModel.find({}).populate("manager").lean<Unit>().exec();
  }
  public static async findById(id: Types.ObjectId): Promise<Unit> {
    return UnitModel.findById({ _id: id }).lean<Unit>().exec();
  }

  public static async fetchByManager(manager: Manager): Promise<Manager[]> {
    return UnitModel.find({ manager })
      .populate("manager")
      .lean<Manager>()
      .exec();
  }

  public static async fetchByDirector(director: Manager): Promise<Manager[]> {
    let query: any = {};
    const id = await RoleRepo.findByRoleCode(RoleCode.DIRECTOR);
    if (!id) throw new InternalError(`Role code not found in Manager Repo`);
    query["roles.role"] = { $all: [id._id] };
    query["_id"] = director._id;

    return UnitModel.find(query).populate("manager").lean<Manager>().exec();
  }
  public static async create(unit: Unit): Promise<Unit> {
    const now = new Date();
    unit.createdAt = unit.updatedAt = now;
    const newUnit = await UnitModel.create(unit);
    return newUnit.toObject();
  }
  public static async updateUnit(unit: Unit): Promise<any> {
    return UnitModel.updateOne({ _id: unit._id }, { $set: { ...unit } })
      .lean()
      .exec();
  }
}
