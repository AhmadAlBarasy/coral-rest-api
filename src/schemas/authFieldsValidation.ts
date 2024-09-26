import Joi, { StringSchema } from 'joi';
import { emailValidator, passwordValidator, stringFieldValidator } from './validators';

const forgotPasswordValidation = Joi.object({
  email: emailValidator,
});

const resetPasswordValidation = Joi.object({
  password: passwordValidator,
});

const loginValidation = Joi.object({
  email: emailValidator,
  password: stringFieldValidator('Password', 100, 1),
});

const registerValidation = Joi.object({
  firstName: stringFieldValidator('First name', 20, 3),
  lastName: stringFieldValidator('Last name', 20, 3),
  email: emailValidator,
  password: passwordValidator,
});

export { 
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
};
