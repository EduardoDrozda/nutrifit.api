import { IGetUserResponseDTO } from '@modules/user/dtos'
import { UnathorizedException } from '@shared/classes/exceptions'
import { Jwt } from '@shared/lib/jwt'
import { NextFunction, Request, Response } from 'express'

export function authMiddleware(req: Request, _: Response, next: NextFunction) {
  try {
    const { headers } = req
    const token = headers.authorization

    const badRequestError = new UnathorizedException('Token not provided')

    if (!token) {
      throw badRequestError
    }

    const [type, accessToken] = token?.split(' ')

    if (type !== 'Bearer') {
      throw badRequestError
    }

    const decodedUser = Jwt.verify(accessToken)
    const user = decodedUser as IGetUserResponseDTO

    req.userId = user.id

    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
}
