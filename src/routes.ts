import { Router } from 'express'
import { userRoutes } from './modules/user'
import { authRoutes } from '@modules/auth'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/auth', authRoutes)

export { routes }
