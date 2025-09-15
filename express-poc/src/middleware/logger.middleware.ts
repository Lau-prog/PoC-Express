import type { Request, Response, NextFunction } from 'express';

// Middleware de logging
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
};
