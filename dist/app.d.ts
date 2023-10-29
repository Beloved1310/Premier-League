import { Application } from 'express';
declare global {
    namespace Express {
        interface Request {
            user?: {};
        }
    }
}
declare const app: Application;
export default app;
