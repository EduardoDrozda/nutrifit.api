import { Router } from 'express'
import { userRoutes } from './modules/user'

const routes = Router()

routes.use('/users', userRoutes)

export { routes }
