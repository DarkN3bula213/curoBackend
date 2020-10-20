import { SuccessResponse } from "../../../core/ApiResponse";
import { InternalError } from "../../../core/ApiError";
import Logger from "../../../core/Logger";
import serviceAccount from "../../../../admin.json";
import { Request, Response, NextFunction } from "express";
import * as firebaseAdmin from "firebase-admin";
import { db } from "../../../config";

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
  fcmToken: string
) => {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      JSON.parse(Buffer.from(db.firebaseConfig, "base64").toString("ascii"))
    ),
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
