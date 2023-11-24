import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

// create user service
const createUserService = async (userInfo: TUser) => {
  if (await User.isUserExists(userInfo.userId)) {
    throw new Error('User already exists');
  }

  const result = await User.create(userInfo);
  return result;
};
// get all user
const getAllUsersService = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

// get single user by id
const getSingleUserByIdService = async (userId: number) => {
  const isUserExists = await User.isUserExists(userId);
  if (isUserExists) {
    const result = await User.findOne({ userId }, { password: 0 });
    return result;
  } else {
    throw {
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    };
  }
};

// update single user by id
const updateSingleUserByIdService = async (
  userId: number,
  updatedDoc: TUser,
) => {
  const isUserExists = await User.isUserExists(userId);
  if (isUserExists) {
    const result = await User.findOneAndUpdate({ userId }, updatedDoc, {
      runValidators: true,
      new: true,
    }).select('-password');
    return result;
  } else {
    throw {
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    };
  }
};

// delete single user by id
const deleteSingleUserByIdService = async (userId: number) => {
  const isUserExists = await User.isUserExists(userId);
  if (isUserExists) {
    const result = await User.findOneAndDelete({ userId });
    return result;
  } else {
    throw {
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    };
  }
};

// add user order
const addUserOrderService = async (userId: number, orderData: TOrder) => {
  const isUserExists = await User.isUserExists(userId);
  if (isUserExists) {
    const result = await User.findOneAndUpdate(
      { userId },
      { $push: { orders: orderData } },
      { runValidators: true },
    );
    return result;
  } else {
    throw {
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    };
  }
};
// get user orders
const getUserOrdersService = async (userId: number) => {
  const isUserExists = await User.isUserExists(userId);
  if (isUserExists) {
    const result = await User.findOne({ userId }, { orders: 1 });
    return result;
  } else {
    throw {
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    };
  }
};
// get user orders total price
const getUserOrderTotalPriceService = async (userId: number) => {
  const isUserExists = await User.isUserExists(userId);
  if (isUserExists) {
    const result = await User.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $unwind: '$orders',
      },
      {
        $group: {
          _id: '$userId',
          totalPrice: {
            $sum: {
              $multiply: ['$orders.price', '$orders.quantity'],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          totalPrice: {
            $round: ['$totalPrice', 2],
          },
        },
      },
    ]);
    return result;
  } else {
    throw {
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    };
  }
};

export const UserServices = {
  createUserService,
  getAllUsersService,
  getSingleUserByIdService,
  updateSingleUserByIdService,
  deleteSingleUserByIdService,
  addUserOrderService,
  getUserOrdersService,
  getUserOrderTotalPriceService,
};
