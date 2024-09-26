import Joi, { StringSchema } from 'joi';

const passwordValidator: StringSchema = Joi.string()
  .min(8)
  .required()
  .pattern(/[A-Z]/, 'uppercase letter')
  .pattern(/[a-z]/, 'lowercase letter')
  .pattern(/\d/, 'number')
  .pattern(/[\W_]/, 'special character')
  .messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.name': 'Password must contain at least one {#name}',
    'any.required': 'Password is required',
});

const emailValidator: StringSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .required()
  .messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
});

const nameValidator = (order: string): StringSchema => Joi.string()
  .min(3)
  .max(20)
  .required()
  .messages({
    'string.base': `${order} name must be a string`,
    'string.min': `${order} name must be at least 3 characters long`,
    'string.max': `${order} name must be less than or equal to 20 characters long`,
    'any.required': `${order} name is required`,
});

const forgotPasswordValidation = Joi.object({
  email: emailValidator,
});

const resetPasswordValidation = Joi.object({
  password: passwordValidator,
});

const loginValidation = Joi.object({
  email: emailValidator,
  password: passwordValidator,
});

const registerValidation = Joi.object({
  firstName: nameValidator('First'),
  lastName: nameValidator('Last'),
  email: emailValidator,
  password:passwordValidator,
});

export { 
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
};
