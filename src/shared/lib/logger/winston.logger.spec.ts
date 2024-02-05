import { describe, expect, it, vi } from 'vitest'
import { ILogger } from './iLogger'
import { WinstonLogger } from './winston.logger'

vi.mock('winston', () => ({
  createLogger: () => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  }),
  transports: {
    Console: vi.fn(),
    File: vi.fn(),
  },
}))

describe('WinstonLogger', () => {
  const logger: ILogger = WinstonLogger.getInstance()

  it('should be defined', () => {
    expect(logger).toBeDefined()
  })

  it('should be same instance', () => {
    const logger2: ILogger = WinstonLogger.getInstance()
    expect(logger).toBe(logger2)
  })

  it('should call info', () => {
    const infoSpy = vi.spyOn(logger, 'info')
    logger.info('info')
    expect(infoSpy).toHaveBeenCalledTimes(1)
    expect(infoSpy).toHaveBeenCalledWith('info')
  })

  it('should call error', () => {
    const errorSpy = vi.spyOn(logger, 'error')
    logger.error('error')
    expect(errorSpy).toHaveBeenCalledTimes(1)
    expect(errorSpy).toHaveBeenCalledWith('error')
  })

  it('should call warn', () => {
    const warnSpy = vi.spyOn(logger, 'warn')
    logger.warn('warn')
    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy).toHaveBeenCalledWith('warn')
  })

  it('should call debug', () => {
    const debugSpy = vi.spyOn(logger, 'debug')
    logger.debug('debug')
    expect(debugSpy).toHaveBeenCalledTimes(1)
    expect(debugSpy).toHaveBeenCalledWith('debug')
  })
})
