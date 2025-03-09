import { z } from 'zod';

const carValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  brand: z.string({ required_error: 'Brand is required' }),
  model: z.string({ required_error: 'Model is required' }),
  year: z
    .number()
    .min(1000, { message: 'Year must be 1000 or later' })
    .nonnegative({ message: 'Year must be a positive number' }),
  CC: z.number().min(0, { message: 'CC must be a positive number' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    required_error: 'Category is required',
  }),
  description: z.string().optional(),
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a positive number' }),
  location: z.string().optional(),
  Mileage: z
    .number()
    .min(0, { message: 'Mileage must be a positive number' })
    .optional(),
  image: z.array(z.string()).nonempty({ message: 'Image is required' }),
  AC: z.boolean().optional(),
  PST: z.boolean().optional(),
  MG: z.boolean().optional(),
  CNG: z.boolean().optional(),
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
  CC: z.number().min(0, { message: 'CC must be a positive number' }).optional(),
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
  location: z.string({ required_error: 'Location is required' }).optional(),
  Mileage: z
    .number()
    .min(0, { message: 'Mileage must be a positive number' })
    .optional(),
  image: z
    .array(z.string())
    .nonempty({ message: 'Image is required' })
    .optional(),
  AC: z.boolean({ required_error: 'AC status is required' }).optional(),
  PST: z.boolean({ required_error: 'PST status is required' }).optional(),
  MG: z.boolean({ required_error: 'MG status is required' }).optional(),
  CNG: z.boolean({ required_error: 'CNG status is required' }).optional(),
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
