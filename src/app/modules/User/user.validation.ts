import { z } from 'zod';

const userRegisterValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string.',
  }),
  email: z.string({
    invalid_type_error: 'Email must be a string.',
  }),
  password: z
    .string({
      invalid_type_error: 'Password must be a string.',
    })
    .max(20, 'Password cannot be more than 20 characters.'),
  role: z.enum(['user', 'admin']).default('user'),
  isBlocked: z.boolean().default(false),
});

const updateUserValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string.',
    })
    .optional(),
  email: z
    .string({
      invalid_type_error: 'Email must be a string.',
    })
    .optional(),
  role: z.enum(['user', 'admin']).default('user').optional(),
  isBlocked: z.boolean().default(false),
});

export const userValidations = {
  userRegisterValidationSchema,
  updateUserValidationSchema,
};
