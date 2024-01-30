import { type Prisma, type User } from '@prisma/client'

export interface IUserRepository {
  store: (data: Prisma.UserCreateInput) => Promise<User>
  getUserByEmail: (email: string) => Promise<User | null>
}
