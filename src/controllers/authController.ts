import { NextFunction, Request, Response } from 'express';
import errorHandler from '../utils/errorHandler';
import APIError from '../utils/APIError';
import { generateToken } from '../utils/jwtToken';
import { 
  checkIfDomainSupportsEmail,
  checkIfUserExists,
  getEmailDomain } from '../services/userService';
import transporter from '../utils/mail/mailSender';
import User from '../db-files/models/User';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { resetPasswordTemplate } from '../utils/mail/mailTemplates';

const signup = errorHandler(
  async(req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;
    if (await checkIfUserExists({ email })) {
      return next(new APIError('Email already in use', 400));
    }
    // this if condition checks if the given email's domain supports mail exchange (has at least 1 MX record)
    if (!await checkIfDomainSupportsEmail(getEmailDomain(email))){
      return next(new APIError('Email domain does not support mail exchange.', 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
    });
  },
);

const login = errorHandler(
  async(req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await checkIfUserExists({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new APIError('Invalid email or password', 401));
    }

    const token = generateToken(user);

    res.cookie('jwt', token, {
      // Ensures the cookie is only sent via HTTP(S) and not accessible via JavaScript
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiration
    });

    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      token,
    });
  },
);

// Logout handler
const logout = errorHandler(
  async(req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('jwt', { httpOnly: true });
    res.status(200).json({
      status: 'success',
      message: 'Successfully logged out'
    });
  },
);

const forgotPassword = errorHandler(
  async(req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    // check if email is valid
    if (!await checkIfDomainSupportsEmail(getEmailDomain(email))){
      return next(new APIError('Invalid email', 400));
    }
    const user = await checkIfUserExists({ email }); 
    if (!user){
      return next(new APIError('Invalid email', 400));
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + (10 * 60 * 1000));
    await user.save();
    await transporter.sendMail(resetPasswordTemplate(email, resetToken));
    res.status(200).json({
      status: 'success',
      message: `An email with a reset link has been sent to ${email}, the link will expire in 10 mintues`,
    });
  }
);

const resetPassword = errorHandler(
  async(req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await checkIfUserExists({ resetToken: token });
    if (!user){
      return next(new APIError('Invalid token', 400));
    }
    if (user.resetTokenExpiry && new Date(Date.now()) > user.resetTokenExpiry) {
      user.resetToken = null;
      user.resetTokenExpiry = null;
      await user.save();
      return next(new APIError('Reset token expired', 400));
    }
    user.password = await bcrypt.hash(password, 10);
    // clean up (update the reset token and the expiry date for the user to be null)
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
    res.status(200).json({
      status: 'success',
      message: 'Password has been reset successfully',
    });

  },
);

export { 
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
};
