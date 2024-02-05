import { Router } from 'express'

import { validateRequestMiddleware } from '@shared/middlewares'
import { createUserValidateSchema } from './schemas'
import { createUserFactory } from './factories'

const userController = createUserFactory.build()

const userRoutes = Router()

userRoutes.post(
  '/',
  validateRequestMiddleware(createUserValidateSchema),
  userController.store,
)

export { userRoutes }
