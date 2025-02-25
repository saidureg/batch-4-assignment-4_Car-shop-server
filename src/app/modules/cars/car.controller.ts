import { Request, Response } from 'express';
import { carService } from './car.service';
import catchAsync from '../../utils/catchAsync';

const createCar = catchAsync(async (req: Request, res: Response) => {
  const result = await carService.createCarIntoDB(req.body);
  res.status(201).json({
    success: true,
    message: 'Car created successfully',
    statusCode: 201,
    data: result,
  });
});

const getAllCars = catchAsync(async (req: Request, res: Response) => {
  const result = await carService.getAllCars(req.query);
  res.status(200).json({
    success: true,
    message: 'Cars retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

const getCarById = catchAsync(async (req: Request, res: Response) => {
  const { carId } = req.params;
  const result = await carService.getCarByIdFromDB(carId);

  res.status(200).json({
    success: true,
    message: 'Car retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

const updateCarById = catchAsync(async (req: Request, res: Response) => {
  const { carId } = req.params;
  const result = await carService.updateCarByIdFromDB(carId, req.body);

  res.status(200).json({
    success: true,
    message: 'Car updated successfully',
    statusCode: 200,
    data: result,
  });
});

const deleteCar = catchAsync(async (req: Request, res: Response) => {
  const { carId } = req.params;
  const result = await carService.deleteCarByIdFromDB(carId);

  res.status(200).json({
    success: true,
    message: result.message,
    statusCode: 200,
  });
});

export const carController = {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCar,
};
