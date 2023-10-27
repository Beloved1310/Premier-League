import { Request, Response } from 'express';
import { teamValidation } from '../validation/team';
import { teamService } from '../services/team';
import { RedisService } from '../services/redis';
import { ResponseService } from '../services/response';


export const teamController = {
  async createTeam (req: Request, res: Response) : Promise<{}> {
    const { value, error } = teamValidation.create.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const data = await teamService.createTeam(value)
    return ResponseService.success(res, 'Team Successfully Created', data);
  },


  async updateTeam (req: Request, res: Response) : Promise<{}> {
    const { value, error } = teamValidation.update.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const { code } = req.params
    await teamService.updateTeam(code, value)
    return ResponseService.success(res, 'Team Successfully Updated');
  },

  async deleteTeam (req: Request, res: Response) : Promise<{}> {
    const { code } = req.params
    await teamService.deleteTeam(code)
    return ResponseService.success(res, 'Team Successfully Deleted')
  },

  async listTeams (req: Request, res: Response) : Promise<{}> {
    const data = await teamService.listTeams()
    return ResponseService.success(res, 'Team Successfully Retrieved', data)
  },
}

