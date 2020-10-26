import { Schema, Document, model } from "mongoose";
import Item from "./Item";
import Unit from "./Unit";

export const DOCUMENT_NAME = "stock";
export const COLLECTION_NAME = "stocks";

export default interface Stock extends Document {
  item: Item;
  qty: number;
  weight: number;
  piece: number;
  noOfBags: number;
  unit: Unit;
}

const stockSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "item",
    required: true,
  },
  qty: {
    type: Schema.Types.Number,
    required: true,
  },
  weight: {
    type: Schema.Types.Number,
    required: true,
  },
  piece: {
    type: Schema.Types.Number,
    required: true,
  },
  noOfBags: {
    type: Schema.Types.Number,
    required: true,
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: "unit",
    required: true,
  },
});

export const StockModel = model<Stock>(
  DOCUMENT_NAME,
  stockSchema,
  COLLECTION_NAME
);
