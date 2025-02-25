import { Request, Response } from 'express';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getAllUsersFromDB();
  res.status(200).json({
    message: 'All users fetched successfully',
    success: true,
    data: result,
  });
});

export const userController = {
  getAllUsers,
};
