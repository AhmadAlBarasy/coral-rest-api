import { NextFunction, Request, Response } from 'express';
import errorHandler from '../utils/errorHandler';
import checkIfBrandExists from '../services/brandService';
import APIError from '../utils/APIError';
import Product from '../models/Product';

const createProduct = errorHandler(
  async(req: Request, res: Response, next: NextFunction) => {
    const { name, brief, description, price, brandId } = req.body;
    if ((await checkIfBrandExists({ id: brandId })) === null){
      return next(new APIError('Brand does not exist.', 400));
    }
    const newProduct = await Product.create({
      name,
      brief,
      description,
      price,
      brandId,
    });
    res.status(201).json({
      status: 'success',
      product: newProduct,
    });
  },
);

export {
  createProduct,
};
