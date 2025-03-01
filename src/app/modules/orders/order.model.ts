import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cars: [
      {
        car: {
          type: Schema.Types.ObjectId,
          ref: 'Car',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be a positive number'],
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price must be a positive number'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  { timestamps: true },
);

const OrderModel = model<IOrder>('Order', orderSchema);

export default OrderModel;
