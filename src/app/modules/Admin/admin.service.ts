import AppError from '../../errors/AppError';
import { User } from '../User/user.model';

const blockUserService = async (userId: string) => {
  const user = await User.findOne({ _id: userId, isBlocked: false }).lean();

  if (!user) {
    throw new AppError(404, 'User not found or already blocked');
  }

  const result = await User.updateOne(
    { _id: userId },
    { $set: { isBlocked: true } },
  );

  if (result.modifiedCount === 0) {
    throw new AppError(500, 'Failed to block user');
  }

  return { message: 'User blocked successfully' };
};

const deleteUserFromDB = async (userId: string) => {
  const user = await User.findOne({ _id: userId }).lean();

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  await User.findByIdAndDelete(userId);

  return { message: 'User deleted successfully' };
};

export const adminServices = {
  blockUserService,
  deleteUserFromDB,
};
