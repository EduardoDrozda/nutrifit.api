import { Router } from 'express'

import { validateRequestMiddleware } from '@shared/middlewares'
import { createUserValidateSchema } from './schemas'
import { createUserControllerFactory } from './factories'

const userController = createUserControllerFactory.build()

const userRoutes = Router()

userRoutes.post(
  '/',
  validateRequestMiddleware(createUserValidateSchema),
  userController.store,
)

export { userRoutes }
