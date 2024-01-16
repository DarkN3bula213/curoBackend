import mongoose,{Document,Schema} from "mongoose";

import { IStudent, Student } from "../students/student.model";
import { ClassModel, IClass } from "../classses/class.model";

const DOCUMENT = "payments";
const COLLECTION = "payments";
export interface IPayment extends Document {
    studentId: IStudent["_id"];
    classId: IClass["_id"];
    amount: number;
    payID: string;

}
const PaymentSchema = new Schema<IPayment>({
  studentId: { type: Schema.Types.ObjectId, ref: Student, required: true },
  classId: { type: Schema.Types.ObjectId, ref: ClassModel, required: true },
  amount: { type: Number, required: true },
  payID: { type: String, required: true },

},{
  timestamps: true,
  versionKey: false,
  
});

PaymentSchema.index({ studentId: 1, payID: 1 }, { unique: true });


export const PaymentModel = mongoose.model<IPayment>(
  DOCUMENT,
  PaymentSchema,
  COLLECTION
);
