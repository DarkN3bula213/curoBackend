import mongoose,{Document,Schema} from "mongoose";

import { IStudent } from "../students/student.model";
import { IClass } from "../classses/class.model";

const DOCUMENT = "payments";
const COLLECTION = "payments";
interface IPayment extends Document {
    studentId: IStudent["_id"];
    classId: IClass["_id"];
    amount: number;
    payID: string;

}
const PaymentSchema = new Schema<IPayment>({
  studentId: { type: Schema.Types.ObjectId, ref: "Students", required: true },
  classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
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
