import mongoose from "mongoose";
import { ClassModel } from "../../core/modules/school/classses/class.model";
import { Student } from "../../core/modules/school/students/student.model";
import asyncHandler from "../../lib/helpers/asyncHandler";
import { SuccessResponse } from "../../lib/api";

//wrapper to make operation upsert

export const upsert = async (model: mongoose.Model<any>, data: any, condition: any) => {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return await model.findOneAndUpdate(condition, data, options);
}

export async function updateStudentClassIds() {
  const students = await Student.find({}).exec();


  console.log(students);
  for (let student of students) {
    const classDoc = await ClassModel.findOne({
      className: student.classId,
    }).exec();
    if (classDoc) {
      student.classId = classDoc._id; 
        student.className = classDoc.className;
      await student.save();

      console.log("found", Date.now());
    } else {
      console.log(
        `No class found with name ${student.classId} for student ${student._id}`
      );
    }
  }
  console.log("All student classIds updated successfully");
}

export const convertStudentData = asyncHandler(async (req, res) => {
  console.time("getStudents");
  const studentDocs = req.body.map((data:any) => new Student(data));
  const savedStudents = await Promise.all(studentDocs.map((doc:any) => doc.save()));
  new SuccessResponse("Students created successfully", savedStudents).send(res);
  console.timeEnd("getStudents");
});