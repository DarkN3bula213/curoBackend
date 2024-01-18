import { Schema, model, Types, Model, Document } from "mongoose";

export const DOCUMENT_NAME = "roles";
export const COLLECTION_NAME = "roles";

export enum RoleCode {
  LEARNER = "LEARNER",
  WRITER = "WRITER",
  EDITOR = "EDITOR",
  ADMIN = "ADMIN",
}

export interface RoleDocument extends Document {
  _id: Types.ObjectId;
  code: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
const schema = new Schema<RoleDocument>(
  {
    code: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(RoleCode),
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
 
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.index({ code: 1, status: 1 });


// Custom static methods interface
interface RoleModel extends Model<RoleDocument> {
  findByCode(code: string): Promise<boolean>;
}

// Define custom static method
schema.statics.findByCode = async function (code: string): Promise<boolean> {
 const found = this.findOne({ code }).select("+code").lean().exec();
  return found;

}

// Create the model
export const RoleModel = model<RoleDocument, RoleModel>(DOCUMENT_NAME, schema, COLLECTION_NAME);

export async function findByCodes(codes: string[]): Promise<RoleDocument[]> {
  return RoleModel.find({ code: { $in: codes }, status: true })
    .lean()
    .exec();
}

export async function findByCode(code: string): Promise<RoleDocument | null> { 
  return RoleModel.findOne({ code, status: true }).lean().exec();
}