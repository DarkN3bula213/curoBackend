import { Types } from "mongoose";
import { Document, model, Schema } from "mongoose";

export const DOCUMENT_NAME = "attendence";
export const COLLECTION_NAME = "attendenceLog";

export default interface Attendence extends Document {
  worker: Types.ObjectId;
  inTime: Date;
  year: number;
  month: number;
  date: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const attendenceSchema = new Schema({
  worker: {
    type: Schema.Types.ObjectId,
    ref: "worker",
    required: true,
  },
  year: {
    type: Schema.Types.Number,
    required: true,
  },
  month: {
    type: Schema.Types.Number,
    required: true,
  },
  date: {
    type: Schema.Types.Number,
    required: true,
  },
  inTime: {
    type: Schema.Types.Date,
    required: true,
  },
  outTime: {
    type: Schema.Types.Date,
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
