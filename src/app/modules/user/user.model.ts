import { Schema, model } from 'mongoose';
import { TOrder, TUser, UserModel } from './user.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';
import validator from 'validator';
// order schema
const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'product quantity is required'],
  },
});

// user schema
const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'user ID is required'],
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    trim: true,
    minlength: 6,
  },
  fullName: {
    type: {
      firstName: {
        type: String,
        required: [true, 'first name is required'],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, 'last name is required'],
        trim: true,
      },
    },

    required: [true, 'full name is required'],
  },
  address: {
    type: {
      street: {
        type: String,
        required: [true, 'street name is required'],
      },
      city: {
        type: String,
        required: [true, 'city name is required'],
      },
      country: {
        type: String,
        required: [true, 'country name is required'],
      },
    },

    required: [true, 'address information is required'],
  },
  age: {
    type: Number,
    required: [true, 'age is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    trim: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid. Please enter a valid email address',
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: [{ type: String, required: [true, 'hobbies is required'] }],
  orders: [orderSchema],
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.BCRYPT_SALT_ROUND),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
