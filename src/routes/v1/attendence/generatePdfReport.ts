import express from "express";
import { BadRequestError } from "../../../core/ApiError";
import AttendenceRepo from "../../../database/repository/AttendenceRepo";
import asyncHandler from "../../../helpers/asyncHandler";
import validator from "../../../helpers/validator";
import attendenceSchema from "./attendenceSchema";
import pdf from "../../../helpers/pdf";
import pdfMiddleware from "express-pdf";
import { pdfResponse } from "types.d.ts";
import path from "path";
import Logger from "../../../core/Logger";

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

    let html = `
    <table>
    <thead>
      <tr>
        <th>Worker</th>
        <th>Date</th>
        <th>InTime</th>
        <th>Came to Work</th>
      </tr>
    </thead>
    <tbody>`;
    logs.forEach((record) => {
      html += `<tr>
      <td> ${record.worker.name}</td>
       <td>Date: ${record.day}/${record.month}/${record.year}</td>
       <td>InTime: ${record.inTime}</td>
       <td>Came to Work: ${record.markedOut}</td>
       </tr>`;
    });
    html += `</tbody></table>`;
    let renderer = new pdf();
    //renderer.setCSS();
    renderer.build(html);
    Logger.info(path.resolve(__dirname, "pdf.css"));
    Logger.info(renderer.html);
    res.pdfFromHTML({
      // express-pdf kicks in
      filename: "report.pdf",
      htmlContent: renderer.html,
    });
  })
);

export default router;
