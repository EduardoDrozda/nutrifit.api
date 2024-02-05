import { IFactory } from '@shared/classes/interfaces'
import { UserController } from '../controllers/user'
import { IUserService, UserService } from '../services/user'
import { IUserRepository, UserRepository } from '../repositories/user'

class CreateUserFactory implements IFactory<UserController> {
  build(): UserController {
    const userService = this.createUserService()
    return new UserController(userService)
  }

  private createUserService(): IUserService {
    const userRepository: IUserRepository = new UserRepository()
    return new UserService(userRepository)
  }
}

const createUserFactory = new CreateUserFactory()

export { createUserFactory }
