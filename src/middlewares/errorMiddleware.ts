import { Request, Response, NextFunction } from 'express';
import Logger from '../services/Logger';

const logger = Logger.getInstance();

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error: ${err.message}`);

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorMiddleware;