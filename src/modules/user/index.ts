import { Router } from 'express';
import { UserController } from './controllers/user';
import { IUserService, UserService } from './services/user';
import { validateRequestMiddleware } from '@shared/middlewares';
import { createUserValidateSchema } from './schemas';
import { IUserRepository, UserRepository } from './repositories/user';

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);
const userController = new UserController(userService);

const userRoutes = Router();

userRoutes.post(
  '/',
  validateRequestMiddleware(createUserValidateSchema),
  userController.store
);

export { userRoutes };
