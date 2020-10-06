import Role, { RoleCode, RoleModel } from "../model/Role";

export default class RoleRepo {
  public static async findByRoleCode(rolecode: RoleCode): Promise<Role> {
    return RoleModel.findOne({ role: rolecode }).lean<Role>().exec();
  }
}
