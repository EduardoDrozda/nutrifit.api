/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  type BadRequestException,
  type UnprocessableEntityException
} from '@shared/classes/exceptions'
import { type NextFunction, type Request, type Response } from 'express'

export function exceptionHandler (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.name === 'BadRequestException') {
    const err = error as BadRequestException

    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode
    })
  }

  if (error.name === 'UnprocessableEntityException') {
    const err = error as UnprocessableEntityException

    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      errors: err.errors
    })
  }

  return res.status(500).json({
    statusCode: 500,
    message: 'Internal server error'
  })
}
