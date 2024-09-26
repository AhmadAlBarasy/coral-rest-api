import Joi from 'joi';
import { internationalPhoneNumberValidator, optionalStringFieldValidator, passwordValidator, uuidV4validator } from './validators';

// Validation schema for user ID
const userIdValidation = Joi.object({
  id: uuidV4validator('User ID'),
});

const updateUserValidation = Joi.object({
  firstName: optionalStringFieldValidator('User First name', 100, 3),

  lastName: optionalStringFieldValidator('User last name', 100, 3),

  dateOfBirth: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.base': 'Date of Birth should be a valid date.',
    }),

  mobileNumber: internationalPhoneNumberValidator,
}).min(1).messages({
  'object.min': 'At least one field is required for update.',
});

const updateUserRoleValidation = Joi.object({
  role: Joi.string()
    .valid('user', 'admin')
    .required()
    .messages({
      'string.base': 'Role should be a type of text.',
      'any.only': 'Role must be one of [user, admin].',
      'any.required': 'Role is a required field.',
    }),
});

const updateUserPasswordValidation = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'string.base': 'Current password should be a type of text.',
      'any.required': 'Current password is required.',
    }),
  newPassword: passwordValidator,
  confirmPassword: Joi.any()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Confirm password does not match the new password.',
      'any.required': 'Confirm password is required.',
    }),
});

export { 
  userIdValidation,
  updateUserValidation,
  updateUserRoleValidation,
  updateUserPasswordValidation };
