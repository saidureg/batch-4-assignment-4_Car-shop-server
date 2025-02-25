import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  password: z.string({ required_error: 'Password is required' }),
});

export const AuthValidations = {
  loginValidationSchema,
};
