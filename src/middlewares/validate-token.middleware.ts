import { AuthLoginResponseEntity } from '@entities/auth-login-response.entity';
import { config } from '@utils/config';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] ?? '';

    if (!token) {
      return res.status(401).json({
        error: true,
        data: null,
        message: 'Unauthorized',
      });
    }

    const decode = jwt.verify(token, config.SECRET_KEY);
    const { userId, roleId, username } = decode as AuthLoginResponseEntity;

    // Inject decode as user to res.locals
    res.locals.user = {
      userId,
      roleId,
      username,
    };

    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({
          error: true,
          data: null,
          message: 'Token is expired',
        });
      }

      return res.status(401).json({
        error: true,
        data: null,
        message: error.message,
      });
    }

    return res.status(401).json({
      error: true,
      data: null,
      message: 'Unauthorized',
    });
  }
};
