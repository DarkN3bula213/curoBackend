import Manager from "../model/Manager";
import Unit, { UnitModel } from "../model/Unit";

export default class UnitRepo {
  public static async create(unit: Unit): Promise<Unit> {
    const now = new Date();
    unit.createdAt = unit.updatedAt = now;
    const newUnit = await UnitModel.create(unit);
    return newUnit.toObject();
  }
}
