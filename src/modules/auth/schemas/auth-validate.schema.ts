import { z } from 'zod'

const authValidate = z.object({
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
})

export { authValidate }
