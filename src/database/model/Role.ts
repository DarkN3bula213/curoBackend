import { model, Document, Schema } from "mongoose";

export const DOCUMENT_NAME = "role";
export const COLLECTION_NAME = "roles";

export enum RoleCode {
  MANAGER = "Manager",
  DIRECTOR = "Director",
  SUPER_ADMIN = "Super Admin",
}

export default interface Role extends Document {
  role: RoleCode;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new Schema({
  role: {
    type: Schema.Types.String,
    enum: [RoleCode.MANAGER, RoleCode.DIRECTOR, RoleCode.SUPER_ADMIN],
    required: true,
    trim: true,
  },
  status: {
    type: Schema.Types.Boolean,
    default: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: new Date(),
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: new Date(),
  },
});

export const RoleModel = model<Role>(
  DOCUMENT_NAME,
  roleSchema,
  COLLECTION_NAME
);
