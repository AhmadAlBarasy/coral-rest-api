import Joi from 'joi';
import { stringFieldValidator } from './validators';

const createBrandValidation = Joi.object({
  name: stringFieldValidator('Brand name', 50, 3),
});

const updateBrandValidation = Joi.object({
  name: stringFieldValidator('Brand name', 50, 3),
});

export { createBrandValidation, updateBrandValidation };
