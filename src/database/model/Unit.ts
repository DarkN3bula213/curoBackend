import { Schema, model, Document } from "mongoose";
import Manager from "./Manager";

export const DOCUMENT_NAME = "unit";
export const COLLECTION_NAME = "units";

export default interface Unit extends Document {
  name: string;
  unit_code: string;
  manager: Manager;
  director: Manager;
  createdAt: Date;
  updatedAt: Date;
}

const unitSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  unit_code: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "manager",
    required: true,
  },
  director: {
    type: Schema.Types.ObjectId,
    ref: "manager",
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

export const UnitModel = model<Unit>(
  DOCUMENT_NAME,
  unitSchema,
  COLLECTION_NAME
);
