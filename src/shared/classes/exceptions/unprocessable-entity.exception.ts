import { HttpStatusCode } from '@shared/enum';

export class UnprocessableEntityException extends Error {
  public statusCode: HttpStatusCode;
  public errors: string[];

  constructor(
    message: string,
    statusCode = HttpStatusCode.UNPROCESSABLE_ENTITY,
    errors: string[] = []
  ) {
    super(message);
    this.name = 'UnprocessableEntityException';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
