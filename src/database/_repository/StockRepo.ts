import { InternalError } from "../../core/ApiError";
import Stock, { StockModel } from "../model/Stock";
import Unit from "../model/Unit";
import Item from "../model/Item";
import { Types } from "mongoose";

export default class StockRepo {
  public static async create(stock: Stock): Promise<Stock> {
    const createdStock = await StockModel.create(stock);
    if (!createdStock) throw new InternalError("error in creating stock");
    return createdStock.toObject();
  }

  public static async fetchAllStock(): Promise<Stock[]> {
    return StockModel.find({}).populate("unit").lean<Stock>().exec();
  }

  public static async fetchByUnit(unit: Unit): Promise<Stock[] | undefined> {
    return StockModel.find({ unit }).lean<Stock>().exec();
  }
  public static async fetchByItem(item: Item): Promise<Stock[] | undefined> {
    return StockModel.find({ item }).lean<Stock>().exec();
  }

  public static async update(stock: Stock): Promise<any> {
    return StockModel.updateOne({ _id: stock._id }, { ...stock })
      .lean()
      .exec();
  }

  public static async findById(id: Types.ObjectId): Promise<Stock> {
    return StockModel.findById(id).lean<Stock>().exec();
  }

  public static async removeStock(_id: Types.ObjectId): Promise<Stock> {
    return StockModel.findByIdAndRemove(_id).lean<Stock>().exec();
  }
}
