import { SuccessResponse } from "../../../core/ApiResponse";
import { InternalError } from "../../../core/ApiError";
import Logger from "../../../core/Logger";
import serviceAccount from "../../../../admin.json";
import { Request, Response, NextFunction } from "express";
import firebaseAdmin from "firebase-admin";

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
  fcmToken: string
) => {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
  });

  const msg = {
    data: {
      score: "850",
      time: new Date().toLocaleDateString(),
    },
    token: fcmToken,
  };

  try {
    firebaseAdmin
      .messaging()
      .send(msg)
      .then(() => next())
      .catch((err) => {
        Logger.info(err);
      });
  } catch (err) {
    throw new InternalError(`Failed to send the message${err.message}`);
  }
};
