import Joi, { ObjectSchema } from 'joi';

const uuidV4validator = (fieldName: string): Joi.StringSchema =>
  Joi.string()
    .uuid({ version: 'uuidv4' })
    .required()
    .messages({
      'string.guid': `${fieldName} ID must be a valid UUID.`,
      'any.required': `${fieldName} ID is required`,
      'string.base': `${fieldName} ID must be a string`,
    });

const emailValidator = Joi.string()
  .email({ tlds: { allow: false } })
  .required()
  .messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  });

const internationalPhoneNumberValidator = Joi.string()
  .pattern(/^\+\d{10,15}$/)
  .required()
  .messages({
    'any.required': 'Phone number is required. Please provide a valid phone number.',
    'string.pattern.base': 'Phone number must start with a "+" sign and be followed by 10 to 15 digits. Ensure the number is in the correct international format.',
  });

  const passwordValidator = Joi.string()
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

const stringFieldValidator = (fieldName: string, maxLength: number, minLength: number) => 
  Joi.string()
    .required()
    .max(maxLength)
    .min(minLength)
    .messages({
      'any.required': `${fieldName} is required`,
      'string.base': `${fieldName} must be a string`,
      'string.max': `${fieldName} must be less than or equal to ${maxLength} characters long`,
      'string.min': `${fieldName} name must be at least ${minLength} characters long`,
    });

const optionalStringFieldValidator = (fieldName: string, maxLength: number, minLength: number) =>
  Joi.string()
    .max(maxLength)
    .min(minLength)
    .messages({
      'string.base': `${fieldName} must be a string`,
      'string.max': `${fieldName} must be less than or equal to ${maxLength} characters long`,
      'string.min': `${fieldName} name must be at least ${minLength} characters long`,
    });

const numberFieldValidator = (fieldName: string, min: number, max: number, precision = 2) =>
  Joi.number()
    .precision(precision)
    .min(min)
    .max(max)
    .required()
    .messages({
      'number.base': `${fieldName} must be a number.`,
      'number.precision': `${fieldName} must have at most ${precision} decimal places.`,
      'number.max': `${fieldName} cannot exceed ${max}.`,
      'number.min': `${fieldName} cannot be less than ${min}.`,
      'any.required': `${fieldName} is a required field.`,
    });

export {
  emailValidator,
  passwordValidator,
  internationalPhoneNumberValidator,
  stringFieldValidator,
  optionalStringFieldValidator,
  numberFieldValidator,
  uuidV4validator,
};