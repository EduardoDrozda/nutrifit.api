import express from 'express'
import { env } from './env'

export class Application {
  private readonly server: express.Application

  get app(): express.Application {
    return this.server
  }

  constructor() {
    this.server = express()

    this.setMiddlewares()
  }

  private setMiddlewares(): void {
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))
  }

  async startup(): Promise<void> {
    const port = env.APP_PORT

    this.server.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  }
}
