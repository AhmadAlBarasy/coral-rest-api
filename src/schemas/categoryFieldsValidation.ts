import Joi from 'joi';
import { stringFieldValidator } from './validators';

const createCategoryValidation = Joi.object({
  name: stringFieldValidator('Category Name', 50, 3),
  description: stringFieldValidator('Category description', 150, 3),
});

const updateCategoryValidation = Joi.object({
  name: stringFieldValidator('Category Name', 50, 3),
  description: stringFieldValidator('Category description', 150, 3),
});

export  { createCategoryValidation, updateCategoryValidation };
