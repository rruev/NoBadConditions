import * as z from 'zod';

export const userLogInSchema = z.object({
  email: z.email({ message: 'Invalid email address' }).trim().toLowerCase(),
  password: z.string(),
});

export const userRegisterSchema = z.object({
  email: z.email({ message: 'Invalid email address' }).trim().toLowerCase(),
  password: z.string().min(3, { message: 'Password must be at least 3 characters long' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const userUpdateSchema = z.object({
  email: z.email({ message: 'Invalid email address' }).trim().toLowerCase(),
});