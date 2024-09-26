import Joi from 'joi';
import { uuidV4validator } from './validators';

const wishListProductIdValidation = Joi.object({
  productId: uuidV4validator('Product ID'),
});

export { wishListProductIdValidation };
