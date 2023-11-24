import { z } from 'zod';

// Define the Zod schema for the order
const OrderValidationSchema = z.object({
  productName: z.string().min(1).max(100),
  price: z.number(),
  quantity: z.number(),
});

// Define the Zod schema for the user
export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1).max(20),
  password: z.string().min(6),
  fullName: z.object({
    firstName: z.string().min(1).max(40),
    lastName: z.string().min(1).max(40),
  }),
  address: z.object({
    street: z.string().min(1).max(60),
    city: z.string().min(1).max(20),
    country: z.string().min(1).max(30),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string().min(1).max(30)),
  orders: z.array(OrderValidationSchema),
});
