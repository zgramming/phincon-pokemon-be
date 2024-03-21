import ClientError from '@utils/exceptions/client-error';
import { NextFunction, Request, Response } from 'express';

export const handlingErrorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ClientError) {
    return res.status(error.statusCode).json({
      error: true,
      data: null,
      message: error.message,
    });
  }

  if (error instanceof Error) {
    return res.status(500).json({
      error: true,
      data: null,
      message: error.message,
    });
  }

  return res.status(500).json({
    error: true,
    data: null,
    message: 'Internal server error',
  });
};
