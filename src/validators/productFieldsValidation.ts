import Joi, { ObjectSchema } from 'joi';

const createProductValidation: ObjectSchema = Joi.object({
  name: Joi.string()
    .required()
    .max(50)
    .messages({
      'any.required': 'Product name is required',
      'string.base': 'Product name must be a string',
      'string.max': 'Product name must be less than or equal to 50 characters long',
    }),
  brief: Joi.string()
    .required()
    .max(50)
    .messages({
      'any.required': 'A product\'s brief description is required',
      'string.base': 'A product\'s brief description must be a string',
      'string.max': 'A product\'s brief description must be less than or\
      equal to 50 characters long',
    }),
  description: Joi.string()
    .required()
    .max(65535)
    .messages({
      'any.required': 'Product description is required',
      'string.base': 'Product description must be a string',
      'string.max': 'Product description must be less than or equal to 65535 characters long',
    }),
  price: Joi.number()
    .precision(2)
    .max(99999.99)
    .min(0)
    .required()
    .messages({
      'number.base': 'Price must be a number.',
      'number.precision': 'Price must have at most 2 decimal places.',
      'number.max': 'Price cannot exceed 99999.99.',
      'number.min': 'Price cannot be less than 0.',
      'any.required': 'Price is a required field.',
    }),
  stock: Joi.number()
    .integer()
    .min(0)
    .messages({
      'number.base': 'Stock must be a number.',
      'number.integer': 'Stock must be an integer.',
      'number.min': 'Stock cannot be less than 0.',
    }),
  brandId: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required()
    .messages({
      'string.guid': 'ID must be a valid UUID.',
      'any.required': 'Brand ID is required',
      'string.base': 'Brand ID must be a string',
    }),
  categoryId: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required()
    .messages({
      'string.guid': 'Category ID must be a valid UUID.',
      'any.required': 'Category ID is required',
      'string.base': 'Category ID must be a string',
    }),
  discountRate: Joi.number()
    .precision(2)
    .min(0.01)
    .max(1.0)
    .default(1)
    .messages({
      'number.base': 'Discount rate must be a number.',
      'number.precision': 'Discount rate must have at most 2 decimal places.',
      'number.min': 'Discount rate cannot be less than 0.01.',
      'number.max': 'Discount rate cannot be greater than 1.0.',
    }),
});

const getProductValidation = Joi.object({
  id: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required()
    .messages({
      'string.guid': 'Product ID must be a valid UUID.',
      'any.required': 'Product ID is required',
      'string.base': 'Product ID must be a string',
    }),
});

export {
  createProductValidation,
  getProductValidation,
};
