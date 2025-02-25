import AppError from '../../errors/AppError';
import CarModel from '../cars/car.model';
import { IOrder } from './order.interface';
import OrderModel from './order.model';

const createOrderIntoDB = async (orderData: IOrder): Promise<IOrder> => {
  const car = await CarModel.findById(orderData.car);
  if (!car) {
    throw new AppError(404, 'Car not found');
  }

  if (car.quantity < orderData.quantity) {
    throw new AppError(400, 'Not enough stock');
  }

  car.quantity -= orderData.quantity;
  if (car.quantity === 0) {
    car.inStock = false;
  }
  await car.save();

  return await OrderModel.create(orderData);
};

const getAllOrdersFromDB = async (): Promise<IOrder[]> => {
  return await OrderModel.find().populate('user').populate('car');
};

const getOrdersByUserId = async (
  userId: string,
  loggedInUserId: string,
): Promise<IOrder[]> => {
  if (userId !== loggedInUserId) {
    throw new AppError(403, 'Unauthorized access');
  }
  return await OrderModel.find({ user: userId }).populate('car');
};

const updateOrderByIdFromDB = async (
  id: string,
  payload: Partial<IOrder>,
): Promise<IOrder | null> => {
  const order = await OrderModel.findById(id);
  if (!order) {
    throw new AppError(404, 'Order not found');
  }

  return await OrderModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteOrderByIdFromDB = async (id: string) => {
  const order = await OrderModel.findById(id);
  if (!order) {
    throw new AppError(404, 'Order not found');
  }

  await OrderModel.findByIdAndDelete(id);

  return { message: 'Order deleted successfully' };
};

const calculateRevenue = async (): Promise<number> => {
  const revenue = await OrderModel.aggregate([
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
};
