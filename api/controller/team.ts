import { Request, Response } from 'express'
import { teamValidation } from '../validation/team'
import { teamService } from '../services/team'
import { RedisService } from '../services/redis'
import { ResponseService } from '../services/response'
import { TeamInput } from '../interfaces/team'

export const teamController = {
  async createTeam(req: Request, res: Response): Promise<{}> {
    const { value, error } = teamValidation.create.validate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })
    const data: TeamInput = await teamService.createTeam(value)
    await RedisService.deleteJson(`team:${data.code}`)
    return ResponseService.success(res, 'Team Successfully Created', data)
  },

  async updateTeam(req: Request, res: Response): Promise<{}> {
    const { value, error } = teamValidation.update.validate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })
    const { code } = req.params
    await teamService.updateTeam(code, value)
    await RedisService.deleteJson(`team:${code}`)
    return ResponseService.success(res, 'Team Successfully Updated')
  },

  async deleteTeam(req: Request, res: Response): Promise<{}> {
    const { code } = req.params
    await RedisService.deleteJson(`team:${code}`)
    await teamService.deleteTeam(code)
    return ResponseService.success(res, 'Team Successfully Deleted')
  },

  async viewTeam(req: Request, res: Response): Promise<{}> {
    const { code } = req.params
    const cachedTeam = await RedisService.getJson(`team:${code}`)
    if (cachedTeam) {
      return ResponseService.success(
        res,
        'Team Successfully Retrieved',
        cachedTeam,
      )
    } else {
      const team = await teamService.getTeam(code)

      // Cache the team data
      await RedisService.setJson(`team:${code}`, team)

      return ResponseService.success(res, 'Team Successfully Retrieved', team)
    }
  },

  async listTeams(req: Request, res: Response): Promise<{}> {
    const queryParams = {
      ...req.query,
    }
    const cacheKey = JSON.stringify(queryParams)
    const cachedTeams = await RedisService.getJson(`teams:${cacheKey}`)

    if (cachedTeams) {
      return ResponseService.success(
        res,
        'Teams Successfully Retrieved',
        cachedTeams,
      )
    } else {
      const data = await teamService.listTeams(queryParams)

      // Cache the list of teams
      await RedisService.setJson(`teams:${cacheKey}`, data)
      // await RedisService.deleteJson(`teams:${cacheKey}`)

      return ResponseService.success(res, 'Teams Successfully Retrieved', data)
    }
  },
}
