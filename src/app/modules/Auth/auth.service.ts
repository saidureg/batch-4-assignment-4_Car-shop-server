import config from '../../config';
import { IUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { ILoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const createUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.isBlocked) {
    throw new Error('User is blocked');
  }

  if (!(await User.isPasswordMatched(password, user?.password))) {
    throw new Error('Password is incorrect');
  }

  const jwtPayload = {
    id: user?._id,
    userEmail: user?.email,
    role: user?.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    token,
  };
};

export const authServices = {
  createUserIntoDB,
  loginUser,
};
