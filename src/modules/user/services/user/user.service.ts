import { BadRequestException } from '@shared/classes/exceptions'
import { Hash } from '@shared/lib'
import { IUserService } from './iUser.service'
import { IUserRepository } from '@modules/user/repositories/user'
import { ICreateUserRequestDTO, IGetUserResponseDTO } from '@modules/user/dtos'

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async store(data: ICreateUserRequestDTO): Promise<IGetUserResponseDTO> {
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

  async getUserByEmail(email: string): Promise<IGetUserResponseDTO | null> {
    const user = await this.userRepository.getUserByEmail(email)

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    }
  }
}
