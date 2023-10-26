import { Response, NextFunction } from 'express';

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req?.user && req?.user?.isAdmin) {
    next();
  } else {
    res.status(403).send({ message: 'Invalid Admin Token' });
  }
};