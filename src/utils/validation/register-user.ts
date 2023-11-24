import { z } from 'zod';

export const registerUserValidator = z
  .object({
    email: z.string().email(),
    username: z.string().max(20).min(2, { message: 'Username  must contain at least 2 symbols' }),
    password: z
      .string()
      .min(8, { message: 'Password must contain at least 8 symbols' })
      .regex(/.*[A-Z].*/, 'Password must contain at least one uppercase letter')
      .regex(/.*[a-z].*/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least 1 digit')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords don`t match',
    path: ['confirmPassword'],
  });
