import { Types } from 'mongoose';

export interface IOrder {
  user: Types.ObjectId;
  car: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
  createdAt?: Date;
  updatedAt?: Date;
}
