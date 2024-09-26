import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import adminMiddleware from '../middlewares/adminMiddleware';
import {
  createNewBrand,
  deleteBrandById,
  getAllBrands,
  getBrandById,
  updateBrandById,
} from '../controllers/brandsController';
import validateJoiRequest from '../middlewares/validateJoiRequest';
import {
  createBrandValidation, brandIdValidator, updateBrandValidation,
} from '../validators/brandFieldsValidation';
import { methodNotAllowed } from '../controllers/suspicionController';
import uploadToMemory from '../middlewares/memoryUploadMiddleware';

const brandRouter = Router();

brandRouter.route('/')
  .get(
    authMiddleware,
    getAllBrands,
  )
  .post(
    uploadToMemory,
    authMiddleware,
    adminMiddleware,
    validateJoiRequest({ bodySchema: createBrandValidation }),
    createNewBrand,
  );

brandRouter.route('/:id')
  .get(
    authMiddleware,
    validateJoiRequest({ paramsSchema: brandIdValidator }),
    getBrandById,
  )
  .put(
    uploadToMemory,
    authMiddleware,
    adminMiddleware,
    validateJoiRequest({ bodySchema: updateBrandValidation, paramsSchema: brandIdValidator }),
    updateBrandById,
  )
  .delete(
    authMiddleware,
    adminMiddleware,
    validateJoiRequest({ paramsSchema: brandIdValidator }),
    deleteBrandById,
  );

brandRouter.route('*').all(methodNotAllowed);

export default brandRouter;
