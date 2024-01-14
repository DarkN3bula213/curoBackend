import { Document, Model, model, Schema, UpdateQuery } from "mongoose";
import bcrypt from "bcrypt";
import {RoleDocument, RoleModel} from "../roles/role.model";

// Constants for document and collection names
const DOCUMENT = "users";


export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  roles: RoleDocument[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// User Schema
const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 200,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      sparse: true, // allows null
      trim: true,
      select: false,
      required: true,
    },
    password: {
      type: Schema.Types.String,

       required: true,
    },
    roles: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'roles',
        },
      ],
      required: true,

    },
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);

// User Model with statics and methods
interface UserModel extends Model<UserDocument> {
  duplicateCheck(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<UserDocument | null>;
  comparePassword(
    candidatePassword: string,
    storedPassword: string
  ): Promise<boolean>;
  updateByAnyField(field: string, value: any): Promise<void>;
  findByEmailAndPassword(email: string, password: string): Promise<UserDocument | null>;
}

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await bcrypt.hash(this.get("password"), 10);
    this.set("password", hashed);
  }
  done();
});

// Static Methods
userSchema.statics.duplicateCheck = async function (
  email: string
): Promise<boolean> {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.statics.findByEmail = function (
  email: string
): Promise<UserDocument | null> {
  return this.findOne({ email }).exec();
};

 

userSchema.statics.updateByAnyField = function (
  field: string,
  value: any
): Promise<void> {
  return this.updateMany({}, {
    $set: { [field]: value },
  } as UpdateQuery<UserDocument>);
};

// Create and export the model
const UserModel = model<UserDocument, UserModel>(DOCUMENT, userSchema);
export default UserModel;

 

// Define the static method
userSchema.statics.findByEmailAndPassword = async function(email: string, password: string) {
  const user = await this.findOne({ email }).select('+password'); // Assuming password field is not selected by default

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
};


userSchema.statics.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    const user = this as unknown as UserDocument;
    const result = await bcrypt.compare(candidatePassword, user.password);
    return result;
  } catch (e) {
    console.error(e);
    return false;
  }
};
