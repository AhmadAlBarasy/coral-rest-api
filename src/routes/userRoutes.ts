import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserReviews,
  changeUserRole,
  updateUserPassword,
} from '../controllers/usersController';
import { methodNotAllowed } from '../controllers/suspicionController';
import {
  userIdValidation,
  updateUserValidation,
  updateUserRoleValidation,
  updateUserPasswordValidation,
} from '../schemas/userFieldsValidation';
import validateJoiRequest from '../middlewares/validateJoiRequest';
import authMiddleware from '../middlewares/authMiddleware';
import adminMiddleware from '../middlewares/adminMiddleware';
import uploadToMemory from '../middlewares/memoryUploadMiddleware';

const userRouter = Router();

userRouter.route('/')
  .get(
    authMiddleware,
    adminMiddleware,
    getAllUsers,
  );

userRouter.route('/:id')
  .get(
    authMiddleware,
    adminMiddleware,
    validateJoiRequest({ paramsSchema: userIdValidation }),
    getUserById,
  )
  .put(
    uploadToMemory,
    authMiddleware,
    validateJoiRequest({ bodySchema: updateUserValidation, paramsSchema: userIdValidation }),
    updateUserById,
  )
  .delete(
    authMiddleware,
    adminMiddleware,
    validateJoiRequest({ paramsSchema: userIdValidation }),
    deleteUserById,
  );

userRouter.route('/:id/reviews')
  .get(
    authMiddleware,
    validateJoiRequest({ paramsSchema: userIdValidation }),
    getUserReviews,
  );

userRouter.route('/:id/role')
  .put(
    authMiddleware,
    adminMiddleware,
    validateJoiRequest({ bodySchema: updateUserRoleValidation, paramsSchema: userIdValidation }),
    changeUserRole,
  );

userRouter.route('/:id/password')
  .put(
    authMiddleware,
    validateJoiRequest({ bodySchema: updateUserPasswordValidation }),
    updateUserPassword,
  );

userRouter.route('*').all(methodNotAllowed);

export default userRouter;
