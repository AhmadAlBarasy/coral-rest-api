import { Router } from 'express';
import { 
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword } from '../controllers/authController';
import { methodNotAllowed } from '../controllers/suspicionController';
import { 
  registerValidation,
  loginValidation,
  forgotPasswordValidation, 
  resetPasswordValidation} from '../validators/authFieldsValidation';
import validateJoiRequest from '../middlewares/validateJoiRequest';
import authMiddleware from '../middlewares/authMiddleware';

const authRouter = Router();

authRouter.route('/signup')
  .post(
    validateJoiRequest({ bodySchema: registerValidation }), 
    signup,
  );

authRouter.route('/login')
  .post(
    validateJoiRequest({ bodySchema: loginValidation }),
    login,
  );

authRouter.route('/logout')
  .get(
    authMiddleware, 
    logout,
  );

authRouter.route('/forgot-password')
  .post(
    validateJoiRequest({ bodySchema: forgotPasswordValidation }),
    forgotPassword,
  );

authRouter.route('/reset-password/:token')
  .post(
    validateJoiRequest({ bodySchema: resetPasswordValidation }),
    resetPassword,
  );

authRouter.route('*').all(methodNotAllowed);

export default authRouter;
