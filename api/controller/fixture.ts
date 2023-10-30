import { Request, Response } from 'express'
import { fixtureValidation } from '../validation/fixture'
import { fixtureService } from '../services/fixture'
import { RedisService } from '../services/redis'
import { ResponseService } from '../services/response'
import { FixtureInput } from '../interfaces/fixture'

export const fixtureController = {
  async createFixture(req: Request, res: Response): Promise<{}> {
    console.log(req.body)
    const { value, error } = fixtureValidation.create.validate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })
    const data: FixtureInput = await fixtureService.createFixture(value)
    // Cache the fixture data
    // await RedisService.deleteJson(`pending-fixtures`)
    await RedisService.setJson(`fixture:${data.code}`, data, 3600)
    return ResponseService.success(res, 'Fixture Successfully Created', data)
  },

  async updateFixture(req: Request, res: Response): Promise<{}> {
    const { value, error } = fixtureValidation.update.validate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })
    const { code } = req.params
    await fixtureService.updateFixture(code, value)
    await RedisService.deleteJson(`fixture:${code}`)
    await RedisService.deleteJson(`completed-fixtures`)

    return ResponseService.success(res, 'Fixture Successfully Updated')
  },

  async deleteFixture(req: Request, res: Response): Promise<{}> {
    const { code } = req.params
    // Delete the fixture and its cache
    await RedisService.deleteJson(`fixture:${code}`)
    await fixtureService.deleteFixture(code)
    return ResponseService.success(res, 'Fixture Successfully Deleted')
  },

  async viewFixture(req: Request, res: Response): Promise<{}> {
    const { code } = req.params
    const cachedFixture = await RedisService.getJson(`fixture:${code}`)
    // const cachedFixture = ''
    if (cachedFixture) {
      return ResponseService.success(
        res,
        'Fixture Successfully Retrieved',
        cachedFixture,
      )
    } else {
      const fixture = await fixtureService.getFixture(code)

      // Cache the fixture data
      await RedisService.setJson(`fixture:${code}`, fixture, 3600)

      return ResponseService.success(
        res,
        'Fixture Successfully Retrieved',
        fixture,
      )
    }
  },

  async listPendingFixtures(req: Request, res: Response): Promise<{}> {
    const queryParams = { ...req.query }
    const cacheKey = JSON.stringify(queryParams)
    const cachedFixtures = await RedisService.getJson(`pending-fixtures:${cacheKey}`)
    // const cachedFixtures = await RedisService.deleteJson(`pending-fixtures`)
    if (cachedFixtures) {
      return ResponseService.success(res, 'Fixtures Successfully Retrieved',
        cachedFixtures,
      )
    } else {
      const data = await fixtureService.listPendingFixtures(queryParams)
      await RedisService.setJson(`pending-fixtures:${cacheKey}`, data, 3600)
      return ResponseService.success(res, 'Pending Fixtures Successfully Retrieved', data)
    }
  },

  async listCompletedFixtures(req: Request, res: Response): Promise<{}> {
    const queryParams = { ...req.query }
    const cacheKey = JSON.stringify(queryParams)
    const cachedFixtures = await RedisService.getJson(`completed-fixtures:${cacheKey}`)
    if (cachedFixtures) {
      return ResponseService.success(res, 'Fixtures Successfully Retrieved',
        cachedFixtures,
      )
    } else {
      const data = await fixtureService.listCompletedFixtures(queryParams)
      await RedisService.setJson(`completed-fixtures:${cacheKey}`, data, 3600)
      return ResponseService.success(res, 'Completed Fixtures Successfully Retrieved', data)
    }
  },
  async listFixtures(req: Request, res: Response): Promise<{}> {
    const queryParams = { ...req.query }
    const cacheKey = JSON.stringify(queryParams)
    const cachedFixtures = await RedisService.getJson(`fixtures:${cacheKey}`)

    if (cachedFixtures) {
      return ResponseService.success(res, 'Fixtures Successfully Retrieved',
        cachedFixtures,
      )
    } else {
      const data = await fixtureService.listFixtures(queryParams)
      await RedisService.setJson(`fixtures:${cacheKey}`, data, 3600)
      return ResponseService.success(res, 'Fixtures Successfully Retrieved', data)
    }
  },
}
