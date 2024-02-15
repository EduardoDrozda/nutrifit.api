import { authMiddleware } from '@shared/middlewares/auth'
import { Router } from 'express'
import { createBodyInfoControllerFactory } from './factories/create-body-info-controller.factory'

const bodyInfoController = createBodyInfoControllerFactory.build()

const bodyInfoRouter = Router()

bodyInfoRouter.use(authMiddleware)

bodyInfoRouter.post('/', bodyInfoController.store)

export { bodyInfoRouter }
