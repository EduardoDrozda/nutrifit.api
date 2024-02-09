import { Router } from 'express'

import { validateRequestMiddleware } from '@shared/middlewares'
import { createUserValidateSchema } from './schemas'
import { createUserControllerFactory } from './factories'
import { authMiddleware } from '@shared/middlewares/auth'

const userController = createUserControllerFactory.build()

const userRoutes = Router()

userRoutes.post(
  '/',
  validateRequestMiddleware(createUserValidateSchema),
  userController.store,
)

userRoutes.use(authMiddleware)

userRoutes.get('/me', userController.getLoggedUser)

export { userRoutes }
