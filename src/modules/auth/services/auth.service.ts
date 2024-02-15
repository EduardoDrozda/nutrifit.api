import { IAuthService } from './IAuth.service'
import { UnathorizedException } from '@shared/classes/exceptions'
import { Hash } from '@shared/lib'
import { IAuthRequestDTO, IAuthResponseDTO } from '../dtos'
import { IUserService } from '@modules/user/services/user'
import { Jwt } from '@shared/lib/jwt'

export class AuthService implements IAuthService {
  constructor(private userService: IUserService) {}

  async login(loginDto: IAuthRequestDTO): Promise<IAuthResponseDTO> {
    const user = await this.userService.getUserByEmail(loginDto.email)

    if (!user || !(await Hash.compare(loginDto.password, user.password))) {
      throw new UnathorizedException('Email or password incorrect')
    }

    return {
      token: {
        type: 'Bearer',
        accessToken: Jwt.sign({ id: user.id }),
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  }
}
