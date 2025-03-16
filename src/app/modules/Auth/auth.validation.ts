import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  password: z.string({ required_error: 'Password is required' }),
});

const changePasswordValidationSchema = z.object({
  oldPassword: z.string({ required_error: 'Old password is required' }),
  newPassword: z.string({ required_error: 'New password is required' }),
});

export const AuthValidations = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
