import { Types, Document, Schema, model } from "mongoose";

export const DOCUMENT_NAME = "worker";
export const COLLECTION_NAME = "workers";

export default interface Worker extends Document {
  unit_id: string;
  aadhar_number: string;
  name: string;
  shift: string;
  mobile_number: string;
  date_of_join: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const workerSchema = new Schema({
  unit_id: {
    type: Schema.Types.String,
    required: true,
  },
  aadhar_number: {
    type: Schema.Types.String,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    trim: true,
    maxlength: 100,
  },
  shift: {
    type: Schema.Types.String,
    trim: true,
    maxlength: 50,
  },
  mobile_number: {
    type: Schema.Types.String,
    trim: true,
    maxlength: 20,
  },
  date_of_join: {
    type: Schema.Types.Number,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    required: true,
    select: false,
  },
  updatedAt: {
    type: Schema.Types.Date,
    required: true,
    select: false,
  },
});

export const WorkerModel = model<Worker>(
  DOCUMENT_NAME,
  workerSchema,
  COLLECTION_NAME
);
