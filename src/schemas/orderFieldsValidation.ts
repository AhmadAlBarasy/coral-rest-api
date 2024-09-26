/* eslint-disable max-len */
import Joi from 'joi';
import { stringFieldValidator, uuidV4validator } from './validators';

const addressValidation = Joi.object({
  state: stringFieldValidator('State', 50, 3),
  city: stringFieldValidator('City', 50, 3),
  street: stringFieldValidator('Street', 50, 3),
  pin: Joi.string()
    .pattern(/^\d+$/)
    .required()
    .messages({
      'any.required': 'The PIN code is required.',
      'string.pattern.base': 'The PIN code must contain only digits. Please enter a valid numerical postal code.',
    }),
});

const orderItemValidation = Joi.object({
  id: uuidV4validator('Product ID'),
  quantity: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Quantity must be an integer number.',
      'number.min': 'Quantity cannot be less than 1.',
      'any.required': 'Quantity is required',
    }),
});

const createOrderValidation = Joi.object({
  itemsList: Joi.array()
    .items(orderItemValidation)
    .min(1)
    .required()
    .messages({
      'array.base': 'Items list must be an array.',
      'array.min': 'At least one item is required to create an order.',
      'any.required': 'Items list is required.',
    }),
  address: addressValidation
    .required()
    .messages({
      'any.required': 'Address information is required.',
      'object.base': 'The address must be an object containing state, city, street, and PIN code.',
    }),
  phoneNumber: Joi.string()
    .pattern(/^\+\d{10,15}$/)
    .required()
    .messages({
      'any.required': 'Phone number is required. Please provide a valid phone number.',
      'string.pattern.base': 'Phone number must start with a "+" sign and be followed by 10 to 15 digits. Ensure the number is in the correct international format.',
    }),
  orderOwner: stringFieldValidator('Order owner', 50, 3),
  cardNumber: Joi.string()
    .required()
    .pattern(
      /^(4\d{12}(\d{3})?)|(5[1-5]\d{14})|(2(2[2-9][1-9]\d{12}|2[3-9]\d{13}|[3-6]\d{14}|7[01]\d{13}|720\d{12}))$/,
    )
    .messages({
      'string.base': 'Credit card number must be a string.',
      'string.empty': 'Credit card number is required.',
      'string.pattern.base': 'Invalid credit card number. Only Visa and Mastercard are accepted.',
    }),
});
const orderIdValidation = Joi.object({
  id: uuidV4validator('Order ID'),
});
export { createOrderValidation, orderIdValidation };
