import { ICar } from './car.interface';
import CarModel from './car.model';
import AppError from '../../errors/AppError';

const createCarIntoDB = async (payload: ICar): Promise<ICar> => {
  return await CarModel.create(payload);
};

const getCarByIdFromDB = async (id: string): Promise<ICar | null> => {
  return await CarModel.findById(id);
};

const updateCarByIdFromDB = async (
  id: string,
  payload: Partial<ICar>,
): Promise<ICar | null> => {
  const car = await CarModel.findById(id);
  if (!car) {
    throw new AppError(404, 'Car not found');
  }

  return await CarModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteCarByIdFromDB = async (id: string) => {
  const car = await CarModel.findById(id);
  if (!car) {
    throw new AppError(404, 'Car not found');
  }

  await CarModel.findByIdAndDelete(id);

  return { message: 'Car deleted successfully' };
};

const getAllCars = async (queryParam: Record<string, unknown>) => {
  const { searchTerm, brand, model, category, minPrice, maxPrice, inStock } =
    queryParam;

  const query = {} as Record<string, unknown>;

  if (searchTerm) {
    query.$or = [
      { brand: { $regex: searchTerm, $options: 'i' } },
      { model: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
      { name: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  if (brand) query.brand = { $regex: brand, $options: 'i' };
  if (model) query.model = { $regex: model, $options: 'i' };
  if (category) query.category = { $regex: category, $options: 'i' };

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice)
      (query.price as Record<string, number>).$gte = Number(minPrice);
    if (maxPrice)
      (query.price as Record<string, number>).$lte = Number(maxPrice);
  }

  if (inStock !== undefined) {
    query.inStock = inStock === 'true';
  }

  if (inStock !== undefined) {
    query.quantity = inStock === 'true' ? { $gt: 0 } : 0;
  }

  return await CarModel.find(query);
};

export const carService = {
  createCarIntoDB,
  getAllCars,
  getCarByIdFromDB,
  updateCarByIdFromDB,
  deleteCarByIdFromDB,
};
