import asyncHandler from "../../../../lib/helpers/asyncHandler";
import { ClassModel } from "./class.model";
import { Logger as log } from "../../../../lib/logger/logger";
import { SuccessResponse } from "../../../../lib/api";
import { InsertManyOptions } from "mongoose";
const Logger = new log(__filename);



 export const bulkPostClasses = asyncHandler(async (req, res) => {
   Logger.debug(req.body);

   //options to make the operation upsert
    const options:InsertManyOptions={
      ordered:true,
      rawResult:true,
      lean:true,
    }
   const classes = await ClassModel.insertMany(req.body, options);

   new SuccessResponse("Students created successfully", classes).send(res);
 });


 export const getClasses = asyncHandler(async (req, res) => {


   const classes = await ClassModel.find().lean().exec();

   new SuccessResponse("Classes fetched successfully", classes).send(res);
 }  )



 export const updateClass = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const {field,newVal} = req.body;

    const updatedClass = await ClassModel.findByIdAndUpdate(
      id,
      { $set: { [field]: newVal } },
      { new: true }
     );
    new SuccessResponse("Class updated successfully", updatedClass).send(res);

  });