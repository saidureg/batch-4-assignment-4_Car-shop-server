import AppError from '../../errors/AppError';
import CarModel from '../cars/car.model';
import { IUser } from '../User/user.interface';
import { IOrder } from './order.interface';
import Order from './order.model';
import { orderUtils } from './order.utils';

const createOrderIntoDB = async (
  user: IUser,
  payload: IOrder,
  client_ip: string,
) => {
  if (!payload?.car) throw new AppError(403, 'Order is not specified');

  const cars = payload.car;
  let totalPrice = 0;

  const car = await CarModel.findById(payload.car);
  if (!car) {
    throw new AppError(404, 'Car not found');
  }

  if (car.quantity < payload.quantity || !car.inStock) {
    throw new AppError(400, 'Not enough stock');
  }

  car.quantity -= payload.quantity;
  if (car.quantity === 0) {
    car.inStock = false;
  }

  if (payload.quantity > 1) {
    totalPrice = car.price * payload.quantity;
  } else {
    totalPrice = car.price;
  }
  await car.save();

  let order = await Order.create({
    user: user.id,
    car: cars,
    totalPrice,
    quantity: payload.quantity,
    estimatedDelivery:
      payload.estimatedDelivery ||
      new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  });

  // payment integration
  const shurjopayPayload = {
    amount: order.totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: 'Dhaka',
    customer_email: user.email,
    customer_phone: '01700000000',
    customer_city: 'Dhaka',
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Processing'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
      { new: true },
    );
  } else {
    throw new AppError(400, 'Payment verification failed');
  }

  return verifiedPayment;
};

const getAllOrdersFromDB = async (): Promise<IOrder[]> => {
  return await Order.find().populate('user').populate('car');
};

const getOrdersByUserId = async (
  userId: string,
  loggedInUserId: string,
): Promise<IOrder[]> => {
  if (userId !== loggedInUserId) {
    throw new AppError(403, 'Unauthorized access');
  }
  return await Order.find({ user: userId }).populate('car');
};

const updateOrderByIdFromDB = async (
  id: string,
  payload: Partial<IOrder>,
): Promise<IOrder | null> => {
  const order = await Order.findById(id);
  if (!order) {
    throw new AppError(404, 'Order not found');
  }

  return await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteOrderByIdFromDB = async (id: string) => {
  const order = await Order.findById(id);
  if (!order) {
    throw new AppError(404, 'Order not found');
  }

  await Order.findByIdAndDelete(id);

  return { message: 'Order deleted successfully' };
};

const calculateRevenue = async (): Promise<number> => {
  const revenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);
  return revenue[0]?.totalRevenue || 0;
};

export const orderService = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrdersByUserId,
  updateOrderByIdFromDB,
  deleteOrderByIdFromDB,
  calculateRevenue,
  verifyPayment,
};
