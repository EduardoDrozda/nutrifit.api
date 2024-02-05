import { HttpStatusCode } from '@shared/enum'

export class BadRequestException extends Error {
  public statusCode: HttpStatusCode
  public errors: string[]
  constructor(
    message: string,
    statusCode = HttpStatusCode.BAD_REQUEST,
    errors: string[] = [],
  ) {
    super(message)
    this.name = 'BadRequestException'
    this.statusCode = statusCode
    this.errors = errors
  }
}
