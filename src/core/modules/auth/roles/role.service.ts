import  { RoleCode, RoleDocument, RoleModel } from "./role.model";

 class RoleService {
  public static async findByRoleCode(rolecode: RoleCode): Promise<RoleDocument> {
    return RoleModel.findOne({ role: rolecode }).lean<RoleDocument>().exec();
  }
    public static async findByCodes(codes: string[]): Promise<RoleDocument[]> {
        return RoleModel.find({ code: { $in: codes }, status: true })
          .lean()
          .exec();
  }
}


export default new RoleService()