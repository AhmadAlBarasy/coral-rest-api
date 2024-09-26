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

const productIdValidation: ObjectSchema = Joi.object({
  id: uuidV4validator('Product'),
});

const stringFieldValidator = (fieldName: string, maxLength: number) => 
  Joi.string()
    .required()
    .max(maxLength)
    .messages({
      'any.required': `${fieldName} is required`,
      'string.base': `${fieldName} must be a string`,
      'string.max': `${fieldName} must be less than or equal to ${maxLength} characters long`,
    });

const optionalStringFieldValidator = (fieldName: string, maxLength: number) =>
  Joi.string()
    .max(maxLength)
    .messages({
      'string.base': `${fieldName} must be a string`,
      'string.max': `${fieldName} must be less than or equal to ${maxLength} characters long`,
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

const createProductValidation: ObjectSchema = Joi.object({
  name: stringFieldValidator('Product name', 50),
  brief: stringFieldValidator('Product brief', 50),
  description: stringFieldValidator('Product description', 65535),
  price: numberFieldValidator('Price', 0, 99999.99),
  stock: Joi.number()
    .integer()
    .min(0)
    .messages({
      'number.base': 'Stock must be a number.',
      'number.integer': 'Stock must be an integer.',
      'number.min': 'Stock cannot be less than 0.',
    }),
  categoryName: stringFieldValidator('Category name', 50),
  brandName: stringFieldValidator('Brand name', 50),
  discountRate: numberFieldValidator('Discount rate', 0.01, 1.0),
});

const updateProductValidation: ObjectSchema = Joi.object({
  name: optionalStringFieldValidator('Product name', 50),
  brief: optionalStringFieldValidator('Product brief', 50),
  description: optionalStringFieldValidator('Product description', 65535),
  price: Joi.number()
    .precision(2)
    .min(0)
    .max(99999.99)
    .messages({
      'number.base': 'Price must be a number.',
      'number.precision': 'Price must have at most 2 decimal places.',
      'number.max': 'Price cannot exceed 99999.99.',
      'number.min': 'Price cannot be less than 0.',
    }),
  stock: Joi.number()
    .integer()
    .min(0)
    .messages({
      'number.base': 'Stock must be a number.',
      'number.integer': 'Stock must be an integer.',
      'number.min': 'Stock cannot be less than 0.',
    }),
  categoryName: optionalStringFieldValidator('Category name', 50),
  brandName: optionalStringFieldValidator('Brand name', 50),
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
}).min(1).messages({
  'object.min': 'At least one field is required.',
});

const deleteProductImageValidation = Joi.object({
  id: uuidV4validator('Product'),
  productImageId: uuidV4validator('Product Image'),
});

const getProductsQueryValidation = Joi.object({
  category: optionalStringFieldValidator('Category name query', 50),
  brand: optionalStringFieldValidator('Brand name query', 50),
});

export {
  createProductValidation,
  updateProductValidation,
  getProductsQueryValidation,
  deleteProductImageValidation,
  productIdValidation,
};
