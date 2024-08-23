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
  createBrandValidation, brandIdValidation, updateBrandValidation,
} from '../validators/brandFileldsValidation';
import { methodNotAllowed } from '../controllers/suspicionController';
import upload from '../middlewares/multerMiddleware';

const brandRouter = Router();

brandRouter.route('/')
  .get(
    authMiddleware,
    getAllBrands,
  )
  .post(
    upload.single('image'),
    authMiddleware,
    adminMiddleware,
    validateJoiRequest({ bodySchema: createBrandValidation }),
    createNewBrand,
  );

brandRouter.route('/:id')
  .get(
    authMiddleware,
    validateJoiRequest({ paramsSchema: brandIdValidation }),
    getBrandById,
  )
  .put(
    upload.single('image'),
    authMiddleware,
    adminMiddleware,
    validateJoiRequest({ paramsSchema: brandIdValidation }),
    validateJoiRequest({ bodySchema: updateBrandValidation }),
    updateBrandById,
  )
  .delete(
    authMiddleware,
    adminMiddleware,
    validateJoiRequest({ paramsSchema: brandIdValidation }),
    deleteBrandById,
  );

brandRouter.route('*').all(methodNotAllowed);
export default brandRouter;
