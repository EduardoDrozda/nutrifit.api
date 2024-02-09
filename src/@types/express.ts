/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IGetUserResponseDTO } from '@modules/user/dtos'

declare namespace Express {
  export interface Request {
    userId?: any
  }
}
