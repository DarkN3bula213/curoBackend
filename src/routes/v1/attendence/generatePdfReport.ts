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
       <td>${record.day}/${record.month}/${record.year}</td>
       <td>${record.inTime}</td>
       <td>${record.markedOut ? "Yes" : "No"}</td>
       </tr>`;
    });
    html += `</tbody></table>`;
    let renderer = new pdf();
    //renderer.setCSS();
    renderer.build(html);
    // Logger.info(renderer.html);
    res.pdfFromHTML({
      // express-pdf kicks in
      filename: "report.pdf",
      htmlContent: renderer.html,
    });
  })
);

router.get(
  "/byUnitId",
  validator(attendenceSchema.getAttendenceByRangeAndUnit),
  asyncHandler(async (req, res: pdfResponse) => {
    const { startDate, endDate, unit_id } = req.body;

    if (startDate > endDate)
      throw new BadRequestError("Start Date is larger than End Date in range");

    const logs = await AttendenceRepo.fetchAttendenceByDateRangeAndUnit(
      startDate,
      endDate,
      unit_id
    );
    if (!logs || logs.length === 0)
      throw new BadRequestError(
        "No Attendence Logs within this range and unit"
      );

    let html = `
    <table>
    <thead>
      <tr>
        <th>Worker</th>
        <th>Unit Id</th>
        <th>Date</th>
        <th>InTime</th>
        <th>Came to Work</th>
      </tr>
    </thead>
    <tbody>`;
    logs.forEach((record) => {
      html += `<tr>
      <td> ${record.worker.name}</td>
      <td>${record.worker.unit_id}</tf>
       <td>${record.day}/${record.month}/${record.year}</td>
       <td>${record.inTime}</td>
       <td>${record.markedOut ? "Yes" : "No"}</td>
       </tr>`;
    });
    html += `</tbody></table>`;
    let renderer = new pdf();
    //renderer.setCSS();
    renderer.build(html);
    // Logger.info(renderer.html);
    res.pdfFromHTML({
      // express-pdf kicks in
      filename: "report.pdf",
      htmlContent: renderer.html,
    });
  })
);

export default router;
