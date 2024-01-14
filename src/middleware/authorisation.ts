import { Router } from "express";
import asyncHandler from "../lib/helpers/asyncHandler";
import { ProtectedRequest } from "global";
import { AuthFailureError } from "../lib/api";
import { findByCodes } from "../core/modules/auth/roles/role.model";
import { Logger  as log} from "../lib/logger/logger";

 
const Logger = new log(__filename);
const router = Router();

export default router.use(
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    if (!req.user || !req.user.roles || !req.currentRoleCodes)
    throw new AuthFailureError("No roles assigned to user ");
    Logger.debug(`user: ${req.user} roles: ${req.user.roles} currentRoleCodes: ${req.currentRoleCodes}`)

    const roles = await findByCodes(req.currentRoleCodes);
    if (roles.length === 0) throw new AuthFailureError("Permission denied");

    let authorized = false;

    for (const userRole of req.user.roles) {
      if (authorized) break;
      for (const role of roles) {
        if (userRole._id.equals(role._id)) {
          authorized = true;
          break;
        }
      }
    }

    if (!authorized) throw new AuthFailureError("Permission denied");

    return next();
  })
);
