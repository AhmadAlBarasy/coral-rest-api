import { Router } from 'express';
import { signup, login, logout, forgotPassword } from '../controllers/authController';
import { methodNotAllowed } from '../controllers/suspicionController';
import { 
  registerValidation,
  loginValidation,
  emailValidation } from '../validators/authFieldsValidation';
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
    validateJoiRequest({ bodySchema: emailValidation }),
    forgotPassword,
);

authRouter.route('*').all(methodNotAllowed);

export default authRouter;
