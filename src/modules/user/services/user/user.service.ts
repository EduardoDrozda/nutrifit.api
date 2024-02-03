import { type IUserRepository } from '@modules/user/repositories/user'
import { type ICreateUserDTO, type IGetUserDTO } from '../../dtos'
import { type IUserService } from './iUser.service'
import { BadRequestException } from '@shared/classes/exceptions'
import { Hash } from '@shared/lib'

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async store(data: ICreateUserDTO): Promise<IGetUserDTO> {
    const { name, email, password } = data
    const findedUser = await this.getUserByEmail(email)

    if (findedUser) {
      throw new BadRequestException('Email already exists')
    }

    const user = await this.userRepository.store({
      name,
      email,
      password: await Hash.hash(password),
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }

  async getUserByEmail(email: string): Promise<IGetUserDTO | null> {
    const user = await this.userRepository.getUserByEmail(email)

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }
}
