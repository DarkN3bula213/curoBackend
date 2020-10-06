import Unit, { UnitModel } from "../model/Unit";

export default class UnitRepo {
  public static async findByUnitCode(unit_code: string): Promise<Unit> {
    return UnitModel.findOne({ unit_code }).lean<Unit>().exec();
  }
  public static async create(unit: Unit): Promise<Unit> {
    const now = new Date();
    unit.createdAt = unit.updatedAt = now;
    const newUnit = await UnitModel.create(unit);
    return newUnit.toObject();
  }
}
