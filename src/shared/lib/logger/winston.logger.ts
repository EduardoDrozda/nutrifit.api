import { ILogger } from './iLogger'
import * as winston from 'winston'

export class WinstonLogger implements ILogger {
  private logger: winston.Logger

  private static instance: WinstonLogger

  public static getInstance(): WinstonLogger {
    if (!WinstonLogger.instance) {
      WinstonLogger.instance = new WinstonLogger()
    }

    return WinstonLogger.instance
  }

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './logs/combined.log' }),
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
