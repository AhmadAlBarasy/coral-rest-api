import Joi, { ObjectSchema } from 'joi';
import { numberFieldValidator, optionalStringFieldValidator, stringFieldValidator, uuidV4validator } from './validators';


const productIdValidation: ObjectSchema = Joi.object({
  id: uuidV4validator('Product ID'),
});


const createProductValidation: ObjectSchema = Joi.object({
  name: stringFieldValidator('Product name', 50, 3),
  brief: stringFieldValidator('Product brief', 50, 3),
  description: stringFieldValidator('Product description', 65535, 200),
  price: numberFieldValidator('Price', 0, 99999.99),
  stock: Joi.number()
    .integer()
    .min(0)
    .messages({
      'number.base': 'Stock must be a number.',
      'number.integer': 'Stock must be an integer.',
      'number.min': 'Stock cannot be less than 0.',
    }),
  categoryName: stringFieldValidator('Category name', 50, 3),
  brandName: stringFieldValidator('Brand name', 50, 3),
  discountRate: numberFieldValidator('Discount rate', 0.01, 1.0),
});

const updateProductValidation: ObjectSchema = Joi.object({
  name: optionalStringFieldValidator('Product name', 50, 3),
  brief: optionalStringFieldValidator('Product brief', 50, 3),
  description: optionalStringFieldValidator('Product description', 65535, 200),
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
  categoryName: optionalStringFieldValidator('Category name', 50, 3),
  brandName: optionalStringFieldValidator('Brand name', 50, 3),
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
  category: optionalStringFieldValidator('Category name query', 50, 3),
  brand: optionalStringFieldValidator('Brand name query', 50, 3),
});

export {
  createProductValidation,
  updateProductValidation,
  getProductsQueryValidation,
  deleteProductImageValidation,
  productIdValidation,
};
