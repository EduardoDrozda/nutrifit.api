import { env } from '@env/index'
import jwt from 'jsonwebtoken'

export abstract class Jwt {
  static sign(payload: string | object | Buffer, secret?: string): string {
    if (!secret) {
      secret = env.JWT_SECRET
    }

    return jwt.sign(payload, secret, { expiresIn: env.JWT_EXPIRES_IN })
  }

  static verify(token: string, secret?: string): string | object {
    if (!secret) {
      secret = env.JWT_SECRET
    }

    return jwt.verify(token, secret)
  }
}
