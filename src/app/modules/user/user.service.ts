import { TUser } from './user.interface';
import { User } from './user.model';

const createUserService = async (userInfo: TUser) => {
  if (await User.isUserExists(userInfo.userId)) {
    throw new Error('User already exists');
  }

  const result = await User.create(userInfo);
  return result;
};

const getAllUsersService = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

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

export const UserServices = {
  createUserService,
  getAllUsersService,
  getSingleUserByIdService,
};
