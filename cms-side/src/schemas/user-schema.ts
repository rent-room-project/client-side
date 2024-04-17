import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  username: z
    .string({ required_error: 'Username is required' })
    .min(3, 'Username must have at least 3 characters')
    .max(255, 'Username is too long'),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email must be a valid Email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(5, 'Password must have at least 5 characters')
    .max(255, 'Password is too long'),
  phoneNumber: z.string().max(18, 'Phone Number is too long').optional(),
  address: z.string().max(255, 'Address is too long').optional(),
  role: z.string()
});

export const loginSchema = userSchema.pick({ email: true, password: true });

export const registerSchema = userSchema.omit({ id: true, role: true });

export type User = z.infer<typeof userSchema>;

export type RegisterPayload = z.infer<typeof registerSchema>;

export type LoginPayload = z.infer<typeof loginSchema>;
