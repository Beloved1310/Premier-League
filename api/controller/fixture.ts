import { Request, Response } from 'express';
import { fixtureValidation } from '../validation/fixture';
import { fixtureService } from '../services/fixture';
import { RedisService } from '../services/redis';
import { ResponseService } from '../services/response';


export const fixtureController = {
  async createFixture (req: Request, res: Response) : Promise<{}> {
    const { value, error } = fixtureValidation.create.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const data = await fixtureService.createFixture(value)
    return ResponseService.success(res, 'Fixture Successfully Created', data);
  },


  async updateFixture (req: Request, res: Response) : Promise<{}> {
    const { value, error } = fixtureValidation.update.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const { code } = req.params
    await fixtureService.updateFixture(code, value)
    return ResponseService.success(res, 'Fixture Successfully Updated');
  },

  async deleteFixture (req: Request, res: Response) : Promise<{}> {
    const { code } = req.params
    await fixtureService.deleteFixture(code)
    return ResponseService.success(res, 'Fixture Successfully Deleted')
  },

  async listFixtures (req: Request, res: Response) : Promise<{}> {
    const data = await fixtureService.listFixtures()
    return ResponseService.success(res, 'Fixture Successfully Retrieved', data)
  },
}

