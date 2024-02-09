import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  APP_PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  HASH_SALT: z.coerce.number().default(10),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('30d'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.log(`Invalid environment variables: ${_env.error.format()}`)
  throw new Error('Invalid environment variables.')
}

export const env = _env.data
