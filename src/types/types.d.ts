import { Response } from "express";

export interface pdfResponse extends Response {
  pdfFromHTML: (args: any) => any;
}


export interface LoggerInterface {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

