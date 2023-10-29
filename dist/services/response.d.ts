import { Response } from 'express';
export declare const ResponseService: {
    success(res: Response, message: string, data?: any, meta?: any): {};
    failure(res: Response, message: string): {};
    notFound(res: Response, message: string): {};
    error(res: Response, message: string): {};
};
