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

const getSingleUserByIdService = async (userId: string) => {
  const result = await User.findById(userId);
  return result;
};

export const UserServices = {
  createUserService,
  getAllUsersService,
  getSingleUserByIdService,
};
