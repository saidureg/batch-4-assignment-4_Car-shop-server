import { Request, Response } from 'express';
import { orderService } from './order.service';
import catchAsync from '../../utils/catchAsync';
import { IUser } from '../User/user.interface';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IUser;
  const order = await orderService.createOrderIntoDB(user, req.body, req.ip!);

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    statusCode: 201,
    data: order,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await orderService.getAllOrdersFromDB();

  res.status(200).json({
    success: true,
    message: 'Orders fetched successfully',
    statusCode: 200,
    data: orders,
  });
});

const getOrdersByUserId = catchAsync(async (req: Request, res: Response) => {
  const loggedInUserId = req.user.id;
  const userId = req.params.userId;

  const orders = await orderService.getOrdersByUserId(userId, loggedInUserId);

  res.status(200).json({
    success: true,
    message: 'Orders fetched successfully',
    statusCode: 200,
    data: orders,
  });
});

const updateOrderById = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  const result = await orderService.updateOrderByIdFromDB(orderId, req.body);

  res.status(200).json({
    success: true,
    message: 'Order updated successfully',
    statusCode: 200,
    data: result,
  });
});

const deleteOrderById = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  const result = await orderService.deleteOrderByIdFromDB(orderId);

  res.status(200).json({
    success: true,
    message: result.message,
    statusCode: 200,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Order verified successfully',
    data: order,
  });
});

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.calculateRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to calculate revenue',
      success: false,
      error,
      stack:
        (error as Error).stack?.match(/"message": "(.*?)"/g) +
        ' ' +
        (error as Error).stack?.split('[as error]')[1],
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrderById,
  deleteOrderById,
  calculateRevenue,
  verifyPayment,
};
