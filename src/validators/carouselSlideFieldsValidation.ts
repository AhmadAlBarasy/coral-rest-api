import Joi from 'joi';

const createCarouselSlideValidation = Joi.object({
  slideOrder: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Slide Order should be a number.',
      'number.integer': 'Slide Order should be an integer.',
      'any.required': 'Slide Order is a required field.',
    }),

  imageUrl: Joi.string()
    .uri()
    .required()
    .messages({
      'string.base': 'Image URL should be a type of text.',
      'string.uri': 'Image URL must be a valid URI.',
      'any.required': 'Image URL is a required field.',
    }),

  title: Joi.string()
    .max(100)
    .optional()
    .messages({
      'string.base': 'Title should be a type of text.',
      'string.max': 'Title should have a maximum length of {#limit}.',
    }),

  description: Joi.string()
    .max(255)
    .optional()
    .messages({
      'string.base': 'Description should be a type of text.',
      'string.max': 'Description should have a maximum length of {#limit}.',
    }),
});

const carouselSlideIdValidation = Joi.object({
  id: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required()
    .messages({
      'string.base': 'ID should be a type of string.',
      'string.guid': 'ID must be a valid UUID.',
      'any.required': 'ID is a required field.',
    }),
});

const updateCarouselSlideValidation = Joi.object({
  slideOrder: Joi.number()
    .integer()
    .optional()
    .messages({
      'number.base': 'Slide Order should be a number.',
      'number.integer': 'Slide Order should be an integer.',
    }),

  imageUrl: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.base': 'Image URL should be a type of text.',
      'string.uri': 'Image URL must be a valid URI.',
    }),

  title: Joi.string()
    .max(100)
    .optional()
    .messages({
      'string.base': 'Title should be a type of text.',
      'string.max': 'Title should have a maximum length of {#limit}.',
    }),

  description: Joi.string()
    .max(255)
    .optional()
    .messages({
      'string.base': 'Description should be a type of text.',
      'string.max': 'Description should have a maximum length of {#limit}.',
    }),
}).min(1).messages({
  'object.min': 'At least one field is required.',
});

export { createCarouselSlideValidation, carouselSlideIdValidation, updateCarouselSlideValidation };
