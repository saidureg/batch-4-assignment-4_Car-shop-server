import express from 'express';
import { carController } from './car.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { carValidations } from './car.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(carValidations.carValidationSchema),
  carController.createCar,
);

router.get('/', carController.getAllCars);
router.get('/:carId', carController.getCarById);

router.patch(
  '/:carId',
  auth(USER_ROLE.admin),
  validateRequest(carValidations.carUpdateValidationSchema),
  carController.updateCarById,
);

router.delete('/:carId', auth(USER_ROLE.admin), carController.deleteCar);

export const carRoutes = router;
