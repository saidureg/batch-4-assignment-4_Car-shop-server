import { model, Schema } from 'mongoose';
import { ICar } from './car.interface';

const carSchema = new Schema<ICar>(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      min: [1000, 'Year must be a positive number'],
    },
    CC: {
      type: Number,
      required: true,
      min: [0, 'CC must be a positive number'],
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
      required: true,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity must be a positive number'],
    },
    location: {
      type: String,
    },
    Mileage: {
      type: Number,
      min: [0, 'Mileage must be a positive number'],
    },
    image: {
      type: [String],
      required: true,
    },
    AC: {
      type: Boolean,
    },
    PST: {
      type: Boolean,
    },
    MG: {
      type: Boolean,
    },
    CNG: {
      type: Boolean,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

const CarModel = model<ICar>('Car', carSchema);

export default CarModel;
