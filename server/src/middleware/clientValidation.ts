import { Request, Response, NextFunction } from 'express';
import JoiValidator from '../services/joiValidation/validation';

function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { error: validationError } = JoiValidator.validateLogin(req.body);
  return !validationError
    ? next()
    : res.status(400).send(validationError.details[0].message);
}

function validateFlashcard(req: Request, res: Response, next: NextFunction) {
  const { error: validationError } = JoiValidator.validateFlashcard(
    req.body.card
  );
  return !validationError
    ? next()
    : res.status(400).send(validationError.details[0].message);
}

function validateDeckName(req: Request, res: Response, next: NextFunction) {
  const { error: validationError } = JoiValidator.validateDeckName(
    req.body.deckName
  );
  return !validationError
    ? next()
    : res.status(400).send(validationError.details[0].message);
}

function validateUser(req: Request, res: Response, next: NextFunction) {
  const { error: validationError } = JoiValidator.validateUser(req.body);
  return !validationError
    ? next()
    : res.status(400).send(validationError.details[0].message);
}

export { validateUser, validateDeckName, validateFlashcard, validateLogin };
