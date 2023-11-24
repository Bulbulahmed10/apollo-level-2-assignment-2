import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.put('/:userId', UserControllers.updateSingleUserById);
router.get('/:userId', UserControllers.getSingleUserById);
router.delete('/:userId', UserControllers.deleteSingleUserById);
router.put('/:userId/orders', UserControllers.addUserOrder);
router.get('/:userId/orders', UserControllers.getUserOrders);
router.get(
  '/:userId/orders/total-price',
  UserControllers.getUserOrderTotalPrice,
);
export const UserRoutes = router;
