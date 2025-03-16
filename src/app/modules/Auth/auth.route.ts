import express from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { userValidations } from '../User/user.validation';
import { AuthValidations } from './auth.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidations.userRegisterValidationSchema),
  authController.createUser,
);
router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  authController.loginUser,
);

router.post(
  '/change-password',auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  authController.changePassword,
);

export const authRoutes = router;
