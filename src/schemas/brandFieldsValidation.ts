import Joi from 'joi';

const brandNameValidator = Joi.string()
  .min(3)
  .max(50)
  .messages({
    'string.min': 'Brand name must be at least 3 characters long',
    'string.max': 'Brand name must be less than or equal to 50 characters long',
  });

const brandIdValidator = Joi.object({
  id: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required()
    .messages({
      'string.guid': 'ID must be a valid UUID.',
      'any.required': 'Brand ID is required',
      'string.base': 'Brand ID must be a string',
    }),
});

const createBrandValidation = Joi.object({
  name: brandNameValidator,
});

const updateBrandValidation = Joi.object({
  name: brandNameValidator,
});
export { createBrandValidation, brandIdValidator, updateBrandValidation };
