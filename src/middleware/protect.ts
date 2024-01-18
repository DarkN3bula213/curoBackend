import { AuthFailureError, AuthFailureResponse } from '@lib/api';
import asyncHandler from '@lib/helpers/asyncHandler';
import { NextFunction, Response } from 'express';
import { RoleCode, RoleModel } from 'src/core/modules/auth/roles/role.model';
import { ProtectedRequest } from 'src/types/global';

export const allowed = (...roleCodes: RoleCode[]) =>
  asyncHandler(
    async (req: ProtectedRequest, res: Response, next: NextFunction) => {
      if (!req.user || !req.user.roles || !req.currentRoleCodes)
        throw new AuthFailureResponse('Unauthenticated Request');
      console.log(req.user.roles);

      const userRoleCodes = await RoleModel.find({
        _id: { $in: req.user.roles },
      }).then((roles) => roles.map((role) => role.code)); // Extract code values

      const isAllowed = roleCodes.some((requiredRoleCode) =>
        userRoleCodes.includes(requiredRoleCode),
      );
   if (isAllowed) {
     next(); // Forward the request if allowed
   } else {
      throw new AuthFailureError('User is not authorized');
   }
      
    }
  );
