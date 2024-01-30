import { PrismaRepository } from '@shared/database'
import { type IUserRepository } from './iUser.repository'
import { type Prisma, type User } from '@prisma/client'

export class UserRepository implements IUserRepository {
  private prisma: PrismaRepository

  constructor() {
    this.prisma = new PrismaRepository()
  }

  async store(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data })
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    })
  }
}
