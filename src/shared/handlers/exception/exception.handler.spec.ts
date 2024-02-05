import {
  BadRequestException,
  UnprocessableEntityException,
} from '@shared/classes/exceptions'
import { describe, expect, it, vi } from 'vitest'
import { exceptionHandler } from './exception.handler'
import { HttpStatusCode } from '@shared/enum'

describe.only('Exception Handler', () => {
  const mockResponse = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  }

  it('should return badRequest response', () => {
    const error = new BadRequestException('Bad Request')

    exceptionHandler(error, {} as any, mockResponse as any, {} as any)

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST)
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatusCode.BAD_REQUEST,
      message: 'Bad Request',
    })
  })

  it('should return unprocessableEntity response', () => {
    const error = new UnprocessableEntityException(
      'Unprocessable Entity',
      HttpStatusCode.UNPROCESSABLE_ENTITY,
      ['error'],
    )

    exceptionHandler(error, {} as any, mockResponse as any, {} as any)

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatusCode.UNPROCESSABLE_ENTITY,
    )
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
      message: 'Unprocessable Entity',
      errors: ['error'],
    })
  })

  it('should return internalServerError response', () => {
    const error = new Error('Internal Server Error')

    exceptionHandler(error, {} as any, mockResponse as any, {} as any)

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
    )
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    })
  })
})
