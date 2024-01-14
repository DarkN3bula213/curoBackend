import { NextFunction,Response } from "express";
import { RoleCode } from "../../core/modules/auth/roles/role.model";
import { RoleRequest } from "global";

export const role =
  (...roleCodes: RoleCode[]) =>
  (req: RoleRequest, res: Response, next: NextFunction) => {
    req.currentRoleCodes = roleCodes;
    next();
  };
