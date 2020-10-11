import express from "express";
import { BadRequestError } from "../../../core/ApiError";
import AttendenceRepo from "../../../database/repository/AttendenceRepo";
import asyncHandler from "../../../helpers/asyncHandler";
import validator from "../../../helpers/validator";
import attendenceSchema from "./attendenceSchema";
import pdf from "../../../helpers/pdf";
import Attendence from "../../../database/model/Attendence";
import pdfMiddleware from "express-pdf";
import { pdfResponse } from "types.d.ts";
import WorkerRepo from "../../../database/repository/WorkerRepo";
import { SuccessMsgResponse } from "../../../core/ApiResponse";

const router = express.Router();

router.use(pdfMiddleware);

router.get(
  "/",
  validator(attendenceSchema.getAttendenceByRange),
  asyncHandler(async (req, res: pdfResponse) => {
    const { startDate, endDate } = req.body;

    if (startDate > endDate)
      throw new BadRequestError("Start Date is larger than End Date in range");

    const logs = await AttendenceRepo.fetchAttendenceByDateRange(
      startDate,
      endDate
    );
    if (!logs || logs.length === 0)
      throw new BadRequestError("No Attendence Logs within this range");

    let html = ``;
    logs.forEach((record) => {
      html += `<div>Worker: ${record.worker.name}</div><br>
       <div>Date: ${record.day}/${record.month}/${record.year}<br>
       <div>InTime: ${record.inTime}</div><br>
       <div>Came to Work: ${record.markedOut}</div><br><br>`;
    });

    let renderer = new pdf();
    renderer.build(html);
    res.pdfFromHTML({
      // express-pdf kicks in
      filename: "report.pdf",
      htmlContent: renderer.html,
    });
  })
);

export default router;
