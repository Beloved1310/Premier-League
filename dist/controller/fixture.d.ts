import { Request, Response } from 'express';
export declare const fixtureController: {
    createFixture(req: Request, res: Response): Promise<{}>;
    updateFixture(req: Request, res: Response): Promise<{}>;
    deleteFixture(req: Request, res: Response): Promise<{}>;
    viewFixture(req: Request, res: Response): Promise<{}>;
    listPendingFixtures(req: Request, res: Response): Promise<{}>;
    listCompletedFixtures(req: Request, res: Response): Promise<{}>;
    listFixtures(req: Request, res: Response): Promise<{}>;
};
