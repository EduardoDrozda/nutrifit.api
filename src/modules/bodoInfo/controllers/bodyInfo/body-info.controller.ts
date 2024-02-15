import { HttpStatusCode } from '@shared/enum'
import { NextFunction, Request, Response } from 'express'

export class BodyInfoController {
  store = async (req: Request, response: Response, next: NextFunction) => {
    try {
      return response
        .status(HttpStatusCode.CREATED)
        .json({ message: 'Body info created' })
    } catch (error) {
      next(error)
    }
  }
}
