import express from 'express'
import { routes } from './routes'
import { env } from './env'
import { exceptionHandler } from '@shared/handlers'
import { type ILogger, WinstonLogger } from '@shared/lib'

export class Application {
  server: express.Application
  private readonly logger: ILogger

  constructor() {
    this.server = express()
    this.logger = new WinstonLogger()

    this.setMiddlewares()
    this.setRoutes()
  }

  private setMiddlewares(): void {
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: false }))
  }

  private setRoutes(): void {
    this.server.use('/api', routes)
    this.server.use(exceptionHandler)
  }

  async startup(): Promise<void> {
    const port = env.APP_PORT

    this.server.listen(port, () => {
      this.logger.info(`Server is running on port ${port}`)
    })
  }
}
