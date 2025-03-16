import mongoose from 'mongoose';
import { z } from 'zod';

const orderValidationSchema = z.object({
  user: z
    .string({ required_error: 'User ID is required' })
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: 'Invalid user ID',
    })
    .transform((id) => new mongoose.Types.ObjectId(id))
    .optional(),
  car: z
    .string({ required_error: 'Car ID is required' })
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: 'Invalid car ID',
    })
    .transform((id) => new mongoose.Types.ObjectId(id)),
  quantity: z.number().int().positive('Quantity must be a positive number'),
  totalPrice: z
    .number()
    .positive('Total price must be a positive number')
    .optional(),
  status: z
    .enum(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
    .default('Pending'),
  estimatedDelivery: z
    .string()
    .optional()
    .default(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()),
});

const orderUpdateValidationSchema = z.object({
  user: z
    .string({ required_error: 'User ID is required' })
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: 'Invalid user ID',
    })
    .transform((id) => new mongoose.Types.ObjectId(id))
    .optional(),
  car: z
    .string({ required_error: 'Car ID is required' })
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: 'Invalid car ID',
    })
    .transform((id) => new mongoose.Types.ObjectId(id))
    .optional(),
  quantity: z
    .number()
    .int()
    .positive('Quantity must be a positive number')
    .optional(),
  totalPrice: z
    .number()
    .positive('Total price must be a positive number')
    .optional(),
  status: z
    .enum(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
    .optional(),
  estimatedDelivery: z
    .string({ required_error: 'Estimated delivery date is required' })
    .optional(),
});

export const orderValidations = {
  orderValidationSchema,
  orderUpdateValidationSchema,
};
