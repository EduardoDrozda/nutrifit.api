/* eslint-disable no-use-before-define */
import { type ILogger } from './iLogger'
import * as Winston from 'winston'

export class WinstonLogger implements ILogger {
  private readonly logger: Winston.Logger

  private static instance: WinstonLogger

  public static getInstance(): WinstonLogger {
    if (!WinstonLogger.instance) {
      WinstonLogger.instance = new WinstonLogger()
    }

    return WinstonLogger.instance
  }

  private constructor() {
    this.logger = Winston.createLogger({
      transports: [
        new Winston.transports.Console(),
        new Winston.transports.File({ filename: './logs/combined.log' }),
      ],
    })
  }

  info(message: string): void {
    this.logger.info(message)
  }

  error(message: string): void {
    this.logger.error(message)
  }

  warn(message: string): void {
    this.logger.warn(message)
  }

  debug(message: string): void {
    this.logger.debug(message)
  }
}
