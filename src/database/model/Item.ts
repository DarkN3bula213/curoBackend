import { Schema, Document, model } from "mongoose";

export const DOCUMENT_NAME = "item";
export const COLELCITON_NAME = "items";

export default interface Item extends Document {
  item_name: string;
  item_code: string;
  packaging_size: number;
  per_piece_weight: number;
  total_box_weight?: number;
}

const itemSchema = new Schema({
  item_name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  item_code: {
    type: Schema.Types.String,
    required: true,
  },
  packaging_size: {
    type: Schema.Types.Number,
    required: true,
  },
  per_piece_weight: {
    type: Schema.Types.Number,
    required: true,
  },
  total_box_weight: {
    type: Schema.Types.Number,
  },
});

export const ItemModel = model<Item>(
  DOCUMENT_NAME,
  itemSchema,
  COLELCITON_NAME
);
