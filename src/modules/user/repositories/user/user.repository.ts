import { PrismaRepository } from '@shared/database';
import { IUserRepository } from './iUser.repository';
import { Prisma, User } from '@prisma/client';

export class UserRepository
  extends PrismaRepository
  implements IUserRepository
{
  constructor() {
    super();
    this.connect();
  }

  async store(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.user.create({ data });
    this.disconnect();
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    this.disconnect();

    return user!;
  }
}
