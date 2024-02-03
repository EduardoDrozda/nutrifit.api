import { env } from '@env/index'
import bcryptjs from 'bcryptjs'

export abstract class Hash {
  static async hash(value: string, salt?: number): Promise<string> {
    if (!salt) {
      salt = env.HASH_SALT
    }

    console.log(salt)

    return bcryptjs.hash(value, salt)
  }

  static async compare(value: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(value, hash)
  }
}
