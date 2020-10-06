import Manager from "../model/Manager";
import Unit, { UnitModel } from "../model/Unit";

export default class UnitRepo {
  public static async create(
    name: string,
    unit_code: string,
    manager: Manager,
    director: Manager
  ): Promise<Unit> {
    const now = new Date();
    const newUnit = await UnitModel.create({
      name,
      unit_code,
      manager,
      director,
      createdAt: now,
      updatedAt: now,
    });
    return newUnit.toObject();
  }
}
