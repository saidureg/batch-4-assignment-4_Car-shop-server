import { z } from 'zod';

const carValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  brand: z.string({ required_error: 'Brand is required' }),
  model: z.string({ required_error: 'Model is required' }),
  year: z
    .number()
    .min(1000, { message: 'Year must be 1000 or later' })
    .nonnegative({ message: 'Year must be a positive number' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    required_error: 'Category is required',
  }),
  description: z.string({ required_error: 'Description is required' }),
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a positive number' }),
  inStock: z.boolean({
    required_error: 'In-stock status is required',
  }),
});

const carUpdateValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).optional(),
  brand: z.string({ required_error: 'Brand is required' }).optional(),
  model: z.string({ required_error: 'Model is required' }).optional(),
  year: z
    .number()
    .min(1000, { message: 'Year must be 1000 or later' })
    .nonnegative({ message: 'Year must be a positive number' })
    .optional(),
  price: z
    .number()
    .min(0, { message: 'Price must be a positive number' })
    .optional(),
  category: z
    .enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
      required_error: 'Category is required',
    })
    .optional(),
  description: z
    .string({ required_error: 'Description is required' })
    .optional(),
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a positive number' })
    .optional(),
  inStock: z
    .boolean({
      required_error: 'In-stock status is required',
    })
    .optional(),
});

export const carValidations = {
  carValidationSchema,
  carUpdateValidationSchema,
};
