import { HttpStatusCode } from '@shared/enum'

export class UnathorizedException extends Error {
  public statusCode: HttpStatusCode
  public errors: string[]

  constructor(
    message: string,
    statusCode = HttpStatusCode.UNAUTHORIZED,
    errors: string[] = [],
  ) {
    super(message)
    this.name = 'UnauthorizedException'
    this.statusCode = statusCode
    this.errors = errors
  }
}
