import { IFactory } from '@shared/classes/interfaces'
import { AuthController } from '../controllers/auth/auth.controller'
import { IAuthService } from '../services'
import { IUserService, UserService } from '@modules/user/services/user'
import { AuthService } from '../services/auth.service'
import {
  IUserRepository,
  UserRepository,
} from '@modules/user/repositories/user'

class CreateAuthControllerFactory implements IFactory<AuthController> {
  build(): AuthController {
    const authService = this.createAuthService()
    return new AuthController(authService)
  }

  private createAuthService(): IAuthService {
    const userRepository: IUserRepository = new UserRepository()
    const userService: IUserService = new UserService(userRepository)

    return new AuthService(userService)
  }
}

const createAuthControllerFactory = new CreateAuthControllerFactory()

export { createAuthControllerFactory }
