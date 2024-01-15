import asyncHandler from "../../../../lib/helpers/asyncHandler";

import { Employee } from "./employee.model";
import { SuccessResponse } from "../../../../lib/api";


export const register = asyncHandler(async (req, res) => {
    const newEmployee = new Employee(req.body);
    const employee = await newEmployee.save();
    return new SuccessResponse("Employee created successfully", employee).send(res);
});


export const getEmployees = asyncHandler(async (req, res) => {
    const employees = await Employee.find().lean().exec();
    return new SuccessResponse("Employees fetched successfully", employees).send(res);
});

export const getEmployee = asyncHandler(async (req, res) => {
    const { employeeId } = req.params;
    const employee = await Employee.findById(employeeId).lean().exec();
    return new SuccessResponse("Employee fetched successfully", employee).send(res);
});


export const getByField = asyncHandler(async (req, res) => {
    const {field, value} = req.params;
    const employee = await Employee.find({[field]: value}).lean().exec();
    return new SuccessResponse("Employee fetched successfully", employee).send(res);
});

export const getCount = asyncHandler(async (req, res) => {
    const count = await Employee.countDocuments();
    return new SuccessResponse("Employee count fetched successfully", count).send(res);
});

export const updateEmployee = asyncHandler(async (req, res) => {
    const {id} = req.params;
     const updatedEmployee = await Employee.findOneAndUpdate(
       { _id: id },
       req.body,
       { new: true }
     );
        return new SuccessResponse("Employee updated successfully", updatedEmployee).send(res);
});

export const deleteEmployee = asyncHandler(async (req, res) => {
     const {id} = req.params;
        const deletedEmployee = await Employee.findOneAndDelete({ _id: id });
            return new SuccessResponse("Employee deleted successfully", deletedEmployee).send(res);
});


const getTeachingStaff = asyncHandler(async (req, res) => {
    const employees = await Employee.find({role: "TEACHER"}).lean().exec();
    return new SuccessResponse("Teaching staff fetched successfully", employees).send(res);
});