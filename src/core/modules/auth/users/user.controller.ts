import { BadRequestError, InternalError, SuccessResponse } from "../../../../lib/api";
import asyncHandler from "../../../../lib/helpers/asyncHandler";
import { RoleCode, RoleModel } from "../roles/role.model";
import bcrypt from "bcrypt";
import UserModel from "./user.model";
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
export const register = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const duplicate = await UserModel.duplicateCheck(email);
  if (duplicate) throw new BadRequestError("Email already exists");
  const role = await RoleModel.findOne({ code: RoleCode.LEARNER })
    .select("+code")
    .lean()
    .exec();
  if (!role) throw new InternalError("Role must be defined");
  const newUser = {
    email,
    username,
    password,
roles: [role._id],
  };
  const user = await UserModel.create(newUser);
  new SuccessResponse("User created successfully", { user }).send(res);
});


export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModel.findByEmail(email);
    if (!user) throw new BadRequestError("Invalid Credentials");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestError("Invalid Credentials");
    const token = jwt.sign({ user: user._id,roles:user.roles }, 'process.env.JWT_SECRET!', {
        expiresIn: '30d',
    });

    res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // Set the token as a cookie

    new SuccessResponse("Login successful", { token }).send(res);
});


export const logout = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie('token');
    new SuccessResponse("Logout successful", null).send(res);
}
);


export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserModel.find().lean().exec();
  new SuccessResponse("Success", { users }).send(res);
});