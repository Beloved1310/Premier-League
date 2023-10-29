import { Request, Response, NextFunction } from 'express';
export declare const asyncErrorhandling: (handler: Function) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
