import { Document, model, Schema } from "mongoose";
import Worker from "./Worker";

export const DOCUMENT_NAME = "attendence";
export const COLLECTION_NAME = "attendenceLog";

export default interface Attendence extends Document {
  worker: Worker;
  inTime: number;
  outTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const attendenceSchema = new Schema({
  worker: {
    type: Schema.Types.ObjectId,
    ref: "worker",
    required: true,
  },
  inTime: {
    type: Schema.Types.Number,
    required: true,
  },
  outTime: {
    type: Schema.Types.Number,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    required: true,
  },
  updatedAt: {
    type: Schema.Types.Date,
    required: true,
  },
});

export const AttendenceModel = model<Attendence>(
  DOCUMENT_NAME,
  attendenceSchema,
  COLLECTION_NAME
);
