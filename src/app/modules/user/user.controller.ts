/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userValidationSchema } from './user.validation';
import { UserServices } from './user.service';

// create user controller
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParsedData = userValidationSchema.parse(userData);
    const result = await UserServices.createUserService(zodParsedData);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// get all user controller
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersService();
    res.status(201).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// get single user by id controller
const getSingleUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getSingleUserByIdService(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error?.error,
    });
  }
};

// update single user by id 
const updateSingleUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;
    const result = await UserServices.updateSingleUserByIdService(
      Number(userId),
      updatedData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error?.error,
    });
  }
};

const deleteSingleUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await UserServices.deleteSingleUserByIdService(
      Number(userId),
    );

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error?.error,
    });
  }
};

const addUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orderData = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await UserServices.addUserOrderService(
      Number(userId),
      orderData,
    );
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error?.error,
    });
  }
};
const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getUserOrdersService(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error?.error,
    });
  }
};
const getUserOrderTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getUserOrderTotalPriceService(
      Number(userId),
    );
    res.status(200).json({
      success: true,
      message: 'total price calculated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error?.error,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUserById,
  updateSingleUserById,
  deleteSingleUserById,
  addUserOrder,
  getUserOrders,
  getUserOrderTotalPrice,
};
