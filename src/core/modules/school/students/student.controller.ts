import { Logger as log } from "../../../../lib/logger/logger";
import asyncHandler from "../../../../lib/helpers/asyncHandler";
import {  Student } from "./student.model";
import { SuccessMsgResponse, SuccessResponse } from "../../../../lib/api";

import mongoose from "mongoose";
import { updateStudentClassIds } from "../../../../lib/functions/mongo";



const Logger = new log("Student Controller");

export const bulkPost = asyncHandler(async (req, res) => {
  console.time("getStudents");
  const savedStudent = await Student.insertMany(req.body);

  new SuccessResponse("Students created successfully", savedStudent).send(res);
  console.timeEnd("getStudents");
});

export const createStudent = asyncHandler(async (req, res) => {
  const newStudent = new Student(req.body);
  const student = await newStudent.save();
  new SuccessResponse("Student created successfully", student).send(res);
});

export const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find()
    .select("+name +classId +className +admission_date")
    .lean()
    .exec();
  new SuccessResponse("Students fetched successfully", students).send(res);
});

export const fixStudentClassIds = asyncHandler(async (req, res) => {
  updateStudentClassIds();
  new SuccessMsgResponse("Fixing student classIds").send(res);
});

export const getStudentsByClassName = asyncHandler(async (req, res) => {
  const { className } = req.query;
  const students = await Student.find(
    { className: className },
    "_id name className section"
  )
    .lean()
    .exec();

  new SuccessResponse("Students fetched successfully", students).send(res);
});


export const getByClassSection = asyncHandler(async (req, res) => {
  const { className, section } = req.query;
  const students = await Student.find(
    { className: className, section: section },
    "_id name className section"
  )
    .lean()
    .exec();

  new SuccessResponse("Students fetched successfully", students).send(res);
});
export const getStudentsById = asyncHandler(async (req, res) => {
  console.dir(req);
  const { id } = req.params;
  const students = await Student.findById(id, "_id name className section")
    .lean()
    .exec();

  new SuccessResponse("Students fetched successfully", students).send(res);
});
export const getPaginatedStudents = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const students = await Student.find()
    .select("+name +classId +className +admission_date")
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
  const total = await Student.countDocuments();
  new SuccessResponse("Students fetched successfully", {
    students,
    total,
    page,
    limit,
  }).send(res);

});
export const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id);
  new SuccessResponse("Student deleted successfully", student).send(res);
});

export const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: objectId } = new mongoose.Types.ObjectId(id);
  const student = await Student.findOneAndUpdate(objectId, req.body, {
    new: true,
  });
  new SuccessResponse("Student updated successfully", student).send(res);
});
