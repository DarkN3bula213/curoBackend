import mongoose, { Schema, Document } from "mongoose";

import { ClassModel, IClass } from "../classses/class.model";
import { IPayment } from "../payments/payment.model";

const DOCUMENT = "student";
const COLLECTION = "students";


export interface IStudent extends Document {
  admission_date: Date;
  registration_no: string;
  classId: IClass["_id"];
  className: IClass["className"];
  section: string;
  name: string;
  father_name: string;
  gender: string;
  dob: Date;
  paymentHistory?: PaymentHistory[];
  address: string;
  phone: number;
  feeType: string;
  status: {
    comments: string[];
    isActive: boolean;
  };
}

const studentMODEL = new Schema<IStudent>(
  {
    admission_date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    registration_no: {
      type: String,
    },
    classId: {
      type: String,
      ref: "classes",
      required: true,
    },
    className: {
      type: String,
    },
    section: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    father_name: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    dob: {
      type: Date,
      // required: true,
    },
    paymentHistory: {
      type: [
        {
          paymentId: {
            type: Schema.Types.ObjectId,
            ref: 'payments',
          },
          payID: {
            type: String,
          },
          paid: {
            type: Boolean,
          },
        },
      ],
    },
    address: {
      type: String,
      // required: true,
    },
    phone: {
      type: Number,
      // required: true,
    },

    feeType: {
      type: String,
      enum: ["Full", "Half","Free"],
      default: "Full",
    },
    status: {
      comments: [
        {
          type: String,
        },
      ],
      isActive: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

studentMODEL.pre<IStudent>("save", async function (next) {
  // Check if className is provided in the request
  if (this.classId) {
    try {
      const classDoc = await ClassModel.findOne({ className: this.classId });
      if (classDoc) {
        // Set classId and className from the found document
        this.classId = classDoc._id;
        this.className = classDoc.className;
      } else {
        // Handle the case where no class is found
        throw new Error("Class not found");
      }
    } catch (error) {
      next(error);
    }
  }
  next();
});

export const Student: mongoose.Model<IStudent> = mongoose.model<IStudent>(
  DOCUMENT,
  studentMODEL,
  COLLECTION
);



export  interface PaymentHistory {
   paymentId: IPayment["_id"];
   payID: string;
   paid: boolean; // Indicates if the payment was made
 }