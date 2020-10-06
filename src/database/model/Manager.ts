import { Document, model, Schema } from "mongoose";
import Role from "./Role";

export const DOCUMENT_NAME = "manager";
export const COLLECTION_NAME = "managers";

export default interface Manager extends Document {
  name: string;
  shift: string;
  mobile_number: string;
  date_of_join: string;
  roles?: Role[];
  isAllowed?: boolean;
  fcm_token?: string;
  createdAt: Date;
  updatedAt: Date;
}

const managerSchema = new Schema({
  name: {
    type: Schema.Types.String,
    trim: true,
    maxlength: 100,
    required: true,
  },
  shift: {
    type: Schema.Types.String,
    enum: ["day", "night"],
    required: true,
  },
  mobile_number: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  date_of_join: {
    type: Schema.Types.Date,
    required: true,
  },
  roles: {
    type: [{ type: Schema.Types.ObjectId, ref: "role" }],
    required: true,
  },
  isAllowed: {
    type: Schema.Types.Boolean,
    required: true,
    default: false,
  },
  fcm_token: {
    type: Schema.Types.String,
    select: false,
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

export const ManagerModel = model<Manager>(
  DOCUMENT_NAME,
  managerSchema,
  COLLECTION_NAME
);
