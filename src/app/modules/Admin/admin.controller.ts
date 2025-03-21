import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { adminServices } from './admin.service';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await adminServices.blockUserService(userId);
  res.status(200).json({
    success: true,
    message: result.message,
    statusCode: 200,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await adminServices.deleteUserFromDB(userId);
  res.status(200).json({
    success: true,
    message: result.message,
    statusCode: 200,
  });
});

export const adminController = {
  blockUser,
  deleteUser,
};
