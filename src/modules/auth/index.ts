import { Router } from 'express'

import { validateRequestMiddleware } from '@shared/middlewares'
import { authValidate } from './schemas'
import { createAuthControllerFactory } from './factories/create-auth-controller.factory'

const authController = createAuthControllerFactory.build()

const authRoutes = Router()

authRoutes.post(
  '/',
  validateRequestMiddleware(authValidate),
  authController.store,
)

export { authRoutes }
