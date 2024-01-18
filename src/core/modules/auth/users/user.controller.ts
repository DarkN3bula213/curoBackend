import {
  BadRequestError,
  InternalError,
  SuccessResponse,
} from '../../../../lib/api';
import asyncHandler from '../../../../lib/helpers/asyncHandler';
import { RoleModel } from '../roles/role.model';

import UserModel from './user.model';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { signToken } from '../../../../lib/utils/jwt';
import { Cookie } from '@lib/constants';
import userService from './user.service';

export const register = asyncHandler(async (req, res) => {
  // const { email, username, password } = req.body;
  // const duplicate = await UserModel.duplicateCheck(email);
  // if (duplicate) throw new BadRequestError('Email already exists');
  // const role = await RoleModel.findOne({ code: RoleCode.LEARNER })
  //   .select('+code')
  //   .lean()
  //   .exec();
  // if (!role) throw new InternalError('Role must be defined');
  // const newUser = {
  //   email,
  //   username,
  //   password,
  //   roles: [role._id],
  // };
  // const user = await UserModel.create(newUser);
  // new SuccessResponse('User created successfully', { user }).send(res);
  const user = await userService.createUser(req.body);
  new SuccessResponse('User created successfully', { user }).send(res);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.validateLogin(req.body);

  const accessToken = signToken({ user }, 'access', { expiresIn: '5m' });
  const refreshToken = signToken({ user }, 'refresh', {
    expiresIn: '30d',
  });

  res.cookie('refreshToken', refreshToken, Cookie('refresh'));

  res.cookie('accessToken', accessToken, Cookie('access'));

  const token = jwt.sign(
    { user: user._id, roles: user.roles },
    'process.env.JWT_SECRET!',
    {
      expiresIn: '30d',
    },
  );

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  new SuccessResponse('Login successful', {
    token,
    accessToken,
    refreshToken,
  }).send(res);
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie('token');
  new SuccessResponse('Logout successful', null).send(res);
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserModel.find().lean().exec();
  new SuccessResponse('Success', { users }).send(res);
});

export const reqUser = asyncHandler(async (req: Request, res: Response) => {
  const user = res.locals.username;
  const auth = res.locals.authorized;
  new SuccessResponse('Success', { user, auth }).send(res);
});

export const registerUserWithRole = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;
  const duplicate = await UserModel.duplicateCheck(email);
  if (duplicate) throw new BadRequestError('Email already exists');
  const roleCode = await RoleModel.findOne({ code: role })
    .select('+code')
    .lean()
    .exec();
  if (!roleCode) throw new InternalError('Role must be defined');
  const newUser = new UserModel({
    email,
    username,
    password,
    roles: [roleCode._id],
  });
  const user = await newUser.save();
  new SuccessResponse('User created successfully', { user }).send(res);
});
