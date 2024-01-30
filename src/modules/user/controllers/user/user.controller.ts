import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../../services/user';
import { HttpStatusCode } from '@shared/enum';

export class UserController {
  constructor(private readonly userService: IUserService) {}

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.store(req.body);
      return res.status(HttpStatusCode.CREATED).json(user);
    } catch (err) {
      next(err);
    }
  };
}
