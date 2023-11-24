import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.put('/:userId', UserControllers.updateSingleUserById);
router.get('/:userId', UserControllers.getSingleUserById);
router.delete('/:userId', UserControllers.deleteSingleUserById);
export const UserRoutes = router;
