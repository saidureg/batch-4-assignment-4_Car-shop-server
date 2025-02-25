import mongoose from 'mongoose';
import { z } from 'zod';

const orderValidationSchema = z.object({
  user: z
    .string({ required_error: 'User ID is required' })
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: 'Invalid user ID',
    })
    .transform((id) => new mongoose.Types.ObjectId(id)),
  car: z
    .string({ required_error: 'Car ID is required' })
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: 'Invalid car ID',
    })
    .transform((id) => new mongoose.Types.ObjectId(id)),
  quantity: z.number().int().positive('Quantity must be a positive number'),
  totalPrice: z.number().positive('Total price must be a positive number'),
  status: z
    .enum(['Pending', 'Processing', 'Shipped', 'Delivered'])
    .default('Pending'),
  estimatedDelivery: z.string({
    required_error: 'Estimated delivery date is required',
  }),
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
  status: z.enum(['Pending', 'Processing', 'Shipped', 'Delivered']).optional(),
  estimatedDelivery: z
    .string({ required_error: 'Estimated delivery date is required' })
    .optional(),
});

export const orderValidations = {
  orderValidationSchema,
  orderUpdateValidationSchema,
};
