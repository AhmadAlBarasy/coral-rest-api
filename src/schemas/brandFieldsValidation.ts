import Joi from 'joi';
import { stringFieldValidator, uuidV4validator } from './validators';

const brandIdValidation = Joi.object({
  id: uuidV4validator('Brand ID'),
});

const createBrandValidation = Joi.object({
  name: stringFieldValidator('Brand name', 50, 3),
});

const updateBrandValidation = Joi.object({
  name: stringFieldValidator('Brand name', 50, 3),
});

export { brandIdValidation, createBrandValidation, updateBrandValidation };
