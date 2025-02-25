import express from 'express';
import { orderController } from './order.controller';
import validateRequest from '../../middleware/validateRequest';
import { orderValidations } from './order.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(orderValidations.orderValidationSchema),
  orderController.createOrder,
);

router.get('/', auth(USER_ROLE.admin), orderController.getAllOrders);
router.get('/:userId', auth(USER_ROLE.user), orderController.getOrdersByUserId);
router.patch(
  '/:orderId',
  auth(USER_ROLE.admin),
  orderController.updateOrderById,
);
router.delete(
  '/:orderId',
  auth(USER_ROLE.admin),
  orderController.deleteOrderById,
);

router.get('/revenue', orderController.calculateRevenue);

export const orderRoutes = router;
