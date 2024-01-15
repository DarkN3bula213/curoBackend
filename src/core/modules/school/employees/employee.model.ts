import mongoose,{Schema,Document} from 'mongoose';

const DOCUMENT = "employees";
const COLLECTION = "employees";

export interface IEmployee extends Document {
   first_name: string;
   last_name: string;
   gender: string;
    role: string;
    father_name: string;
    address: string;
    cnic: number;
    phone: number;
    dob: Date;
    last_qualification: string;
    passing_year: number;
    marks_obtained: string;
    board_uni: string;
    designation: string;
    joining_date: Date;
    package: number;
    status: {
        isActive: boolean;
        comments: string[];
    };
}

const schema = new Schema<IEmployee>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  role: {
    type: String,
    enum: ["Teaching", "Non Teaching"],
    required: true,
  },
  father_name: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  cnic: {
    type: Number,
  },
  phone: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    // required: true,
    // set: (val) => {
    //   const [day, month, year] = val.split("/");
    //   return new Date(year, month - 1, day);
    // },
  },
  last_qualification: {
    type: String,
  },
  passing_year: {
    type: Number,
  },
  marks_obtained: {
    type: String,
  },
  board_uni: {
    type: String,
  },
  designation: {
    type: String,
    required: true,
  },
  joining_date: {
    type: Date,
  },
  package: {
    type: Number,
    required: true,
  },
  status: {
    isActive: {
      type: Boolean,
      default: true,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
});

export const Employee = mongoose.model<IEmployee>(DOCUMENT, schema, COLLECTION);