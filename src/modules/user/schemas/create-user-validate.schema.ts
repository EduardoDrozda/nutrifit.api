import { z } from 'zod';

const createUserValidateSchema = z
  .object({
    name: z.string().min(2).max(255).optional(),
    email: z.string().email().min(2).max(255).optional(),
    password: z.string().min(6).max(255).optional(),
    passwordConfirmation: z.string().min(6).max(255).optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password and password confirmation must be equal',
    path: ['passwordConfirmation'],
  });

export { createUserValidateSchema };
