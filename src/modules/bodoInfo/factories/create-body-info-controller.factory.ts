import { IFactory } from '@shared/classes/interfaces'
import { BodyInfoController } from '../controllers/bodyInfo'

class CreateBodyInfoControllerFactory implements IFactory<BodyInfoController> {
  build(): BodyInfoController {
    return new BodyInfoController()
  }

  // private createUserService(): IUserService {
  //   const userRepository: IUserRepository = new UserRepository()
  //   return new UserService(userRepository)
  // }
}

const createBodyInfoControllerFactory = new CreateBodyInfoControllerFactory()

export { createBodyInfoControllerFactory }
