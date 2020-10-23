import Item, { ItemModel } from "../model/Item";
import { Types } from "mongoose";

export class ItemRepo {
  public static async create(item: Item): Promise<Item> {
    const createdItem = await ItemModel.create(item);
    return createdItem.toObject();
  }
  public static async update(item: Item): Promise<any> {
    return ItemModel.updateOne({ _id: item._id }, { ...item })
      .lean()
      .exec();
  }
  public static async removeItem(id: Types.ObjectId): Promise<Item> {
    return ItemModel.findByIdAndRemove(id).lean<Item>().exec();
  }

  public static async findByItemCode(item_code: string): Promise<Item> {
    return ItemModel.findOne({ item_code }).lean<Item>().exec();
  }
  public static async findByItemId(_id: Types.ObjectId): Promise<Item> {
    return ItemModel.findById(_id).lean<Item>().exec();
  }
  public static async fetchAll(): Promise<Item[]> {
    return ItemModel.find({}).lean<Item>().exec();
  }
}
