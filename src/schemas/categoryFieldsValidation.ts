import Joi from 'joi';
import { stringFieldValidator, uuidV4validator } from './validators';

const categoryIdValidation = Joi.object({
  id: uuidV4validator('Category ID'),
});

const createCategoryValidation = Joi.object({
  name: stringFieldValidator('Category Name', 50, 3),
  description: stringFieldValidator('Category description', 150, 3),
});

const updateCategoryValidation = Joi.object({
  name: stringFieldValidator('Category Name', 50, 3),
  description: stringFieldValidator('Category description', 150, 3),
});

export  { categoryIdValidation, createCategoryValidation, updateCategoryValidation };
