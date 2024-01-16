import mongoose,{Schema,Document} from "mongoose";


export interface IClass extends Document {
    className: string;
    section: string[];
    fee: number;
}

const DOCUMENT = "classes";
const COLLECTION = "classes";

const schema = new Schema<IClass>({
    className: {
        type: Schema.Types.String,
        trim: true,
        maxlength: 200,
        unique: true,
        required: true,
    },
    section: {
        type: [Schema.Types.String],
        required: true,
    },
    fee: {
        type: Schema.Types.Number,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
    versionKey: false,

})

export const ClassModel = mongoose.model<IClass>(DOCUMENT, schema, COLLECTION);



export async function getClassById(id: string) {
    return await ClassModel.findById(id);
}