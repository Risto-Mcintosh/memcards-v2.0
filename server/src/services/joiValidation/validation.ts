import Joi from '@hapi/joi';
import { User } from '../mongo/models/user.model';

function validateUser(user: User) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  });

  return schema.validate(user);
}

function validateLogin(user: User) {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  });

  return schema.validate(user);
}

export default {
  validateUser,
  validateLogin
};
