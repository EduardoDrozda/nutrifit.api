import express from 'express'
import { env } from './env'
import { ILogger, WinstonLogger } from './shared/lib'

export class Application {
  private readonly server: express.Application
  private readonly logger: ILogger

  get app(): express.Application {
    return this.server
  }

  constructor() {
    this.server = express()
    this.logger = WinstonLogger.getInstance()

    this.setMiddlewares()
  }

  private setMiddlewares(): void {
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))
  }

  async startup(): Promise<void> {
    const port = env.APP_PORT

    this.server.listen(port, () => {
      this.logger.info(`Server is running on port ${port}`)
    })
  }
}
