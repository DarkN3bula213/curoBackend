/**
 * Represents a pagination service.
 * This class helps with managing pagination for a given Mongoose model.
 */
import { Model } from "mongoose";
export interface PaginatedResponse {
  result: any[];
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
}

export default class PaginationService {
  private model: Model<any>;

  /**
   * Create a PaginationService instance.
   * @param {mongoose.Model} model - The Mongoose model to paginate.
   */

  constructor(model: Model<any>) {
    this.model = model;
  }

  private _page_size: number = 10; // Default size is 10

  /**
   * Gets or sets the page size.
   * @default 10
   */

  get page_size(): number {
    return this._page_size;
  }

  set page_size(newSize: number) {
    if (newSize <= 0) {
      throw new Error("Size must be a positive number");
    }
    this._page_size = newSize;
  }

  /**
   * Get Paginated Response
   * Next and Previous page as Boolean
   */

  async getPaginatedResponce(page: number): Promise<PaginatedResponse> {
    const totalDocumentsRecords = await this.model.countDocuments({});

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalDocumentsRecords / this.page_size);

    // Determine if there's page
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    const result = await this.model
      .find()
      .limit(this.page_size)
      .skip((page - 1) * this.page_size)
      .exec();

    const response: PaginatedResponse = {
      result,
      hasNextPage,
      hasPreviousPage,
    };

    return response;
  }
}
