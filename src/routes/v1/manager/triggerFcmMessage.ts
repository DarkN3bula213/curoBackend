import { Response } from "express";
import firebase from "firebase-admin";
import { SuccessResponse } from "../../../core/ApiResponse";
import { InternalError } from "../../../core/ApiError";
import Logger from "../../../core/Logger";
import path from "path";

export default async (res: Response, fcmToken: string) => {
  firebase.initializeApp({
    credential: firebase.credential.cert(
      path.join(__dirname, "../../../../admin.json")
    ),
  });

  var message = {
    data: {
      score: "850",
      time: new Date().toLocaleDateString(),
    },
    token: fcmToken,
  };

  firebase
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      new SuccessResponse("Sucessfully sent message", { response }).send(res);
      return true;
    })
    .catch((error) => {
      Logger.info(error);
      throw new InternalError("Failed to send the message");
    });
};
