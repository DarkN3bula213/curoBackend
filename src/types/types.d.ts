import { Response } from "express";

export interface pdfResponse extends Response {
  pdfFromHTML: (args: any) => any;
}
