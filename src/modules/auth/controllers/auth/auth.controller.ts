import { IAuthRequestDTO } from '@modules/auth/dtos'
import { IAuthService } from '@modules/auth/services'
import { HttpStatusCode } from '@shared/enum'
import { NextFunction, Request, Response } from 'express'

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as IAuthRequestDTO
      const { user, token } = await this.authService.login({
        email,
        password,
      })

      return res.status(HttpStatusCode.OK).json({ user, token })
    } catch (err) {
      next(err)
    }
  }
}
