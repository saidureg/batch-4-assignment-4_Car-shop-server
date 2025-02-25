import express from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { userValidations } from '../User/user.validation';
import { AuthValidations } from './auth.validation';

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

export const authRoutes = router;
