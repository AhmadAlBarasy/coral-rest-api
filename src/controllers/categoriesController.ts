import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import errorHandler from '../utils/errorHandler';
import checkIfCategoryExists from '../services/categoryService';
import APIError from '../utils/APIError';

const createCategory = errorHandler(
  async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, description } = req.body;

    // Check if the category already exists
    const categoryExists = await checkIfCategoryExists(name);

    if (categoryExists) {
      return next(new APIError('Category name already exists', 400));
    }

    // Create the new category
    const category = await Category.create({ name, description });

    res.status(201).json(category);
  },
);

export { createCategory };
