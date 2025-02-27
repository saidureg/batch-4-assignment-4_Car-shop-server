import { Types } from 'mongoose';

export interface IOrder {
  user: Types.ObjectId;
  cars: {
    car: Types.ObjectId;
    quantity: number;
  }[];
  quantity: number;
  totalPrice: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
