import { z } from 'zod'

const createUserValidateSchema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email()
      .min(1)
      .max(255),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, {
        message: 'Password must be at least 6 characters',
      })
      .max(255),
    passwordConfirmation: z
      .string({
        required_error: 'Password confirmation is required',
      })
      .min(6, {
        message: 'Password confirmation must be at least 6 characters',
      })
      .max(255),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password and password confirmation must be equal',
    path: ['passwordConfirmation'],
  })

export { createUserValidateSchema }
