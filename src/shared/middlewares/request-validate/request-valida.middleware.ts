/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnprocessableEntityException } from '@shared/classes/exceptions';
import { HttpStatusCode } from '@shared/enum';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export function validateRequestMiddleware<T>(validateSchema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const validatedData = validateSchema.parse(data);
      req.body = validatedData;
      next();
    } catch (err: any) {
      const errors = err.issues.map((issue: any) => issue.message);

      next(
        new UnprocessableEntityException(
          'Validation error',
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          errors
        )
      );
    }
  };
}
