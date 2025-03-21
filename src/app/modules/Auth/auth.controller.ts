import { Request, Response } from 'express';
import { authServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.createUserIntoDB(req.body);
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    statusCode: 201,
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
    },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: {
      token: result.token,
    },
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.changePassword(req.user, req.body);

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
    statusCode: 200,
    data: result,
  });
});

export const authController = {
  createUser,
  loginUser,
  changePassword,
};
