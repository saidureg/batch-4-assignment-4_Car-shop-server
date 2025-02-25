import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/User/user.interface';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { User } from '../modules/User/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(401, 'Unauthorized User!');
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userEmail, id } = decoded;

    const user = await User.isUserExistsByEmail(userEmail);

    if (!user) {
      throw new AppError(404, 'This user is not found');
    }

    const isUserBlocked = user?.isBlocked;
    if (isUserBlocked) {
      throw new AppError(403, 'This user is blocked');
    }

    if (requiredRoles && !requiredRoles.includes(role as TUserRole)) {
      throw new AppError(403, 'You are not allowed to access this resource');
    }

    req.body.author = id;

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
