import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ValidationError } from '@hapi/joi';

export default function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (err.name === 'ValidationError') {
    const message = (err as unknown) as ValidationError;
    return res.status(400).send(message.details[0].message);
  }
  return res.status(500).send(err);
}
