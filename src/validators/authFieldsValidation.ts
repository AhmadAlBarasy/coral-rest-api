
import Joi from 'joi';
// Define the schema for registration validation with length constraints
const registerValidation = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'First name must be a string',
      'string.min': 'First name must be at least 3 characters long',
      'string.max': 'First name must be less than or equal to 20 characters long',
      'any.required': 'First name is required',
    }),
  lastName: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Last name must be a string',
      'string.min': 'Last name must be at least 3 characters long',
      'string.max': 'Last name must be less than or equal to 20 characters long',
      'any.required': 'Last name is required',
    }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  dateOfBirth: Joi.string().isoDate().required().messages({
    'string.isoDate': 'Date of birth must be a valid date in ISO 8601 format',
    'any.required': 'Date of birth is required',
  }),
  mobileNumber: Joi.string()
    .min(10)
    .max(15)
    .required()
    .pattern(/^[0-9]+$/)
    .messages({
      'string.base': 'Mobile Number should be a type of text.',
      'string.pattern.base': 'Mobile Number should only contain numbers.',
      'string.min': 'Mobile Number should have at least {#limit} digits.',
      'string.max': 'Mobile Number should have a maximum length of {#limit} digits.',
    }),
  password: Joi.string()
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
    }),
  confirmPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Password confirmation is required',
    }),
});

const loginValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required',
    }),
});

export { registerValidation, loginValidation };
