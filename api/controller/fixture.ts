import { Request, Response } from 'express'
import { fixtureValidation } from '../validation/fixture'
import { fixtureService } from '../services/fixture'
import { RedisService } from '../services/redis'
import { ResponseService } from '../services/response'
import { FixtureInput } from '../interfaces/fixture'

export const fixtureController = {
  async createFixture(req: Request, res: Response): Promise<{}> {
    const { value, error } = fixtureValidation.create.validate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })

    const data: FixtureInput = await fixtureService.createFixture(value)
    // Cache the fixture data
    await RedisService.setJson(`fixture:${data.code}`, data)

    return ResponseService.success(res, 'Fixture Successfully Created', data)
  },

  async updateFixture(req: Request, res: Response): Promise<{}> {
    const { value, error } = fixtureValidation.update.validate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })

    const { code } = req.params

    // Update the fixture and delete the cache
    await fixtureService.updateFixture(code, value)
    await RedisService.deleteJson(`fixture:${code}`)

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

    if (cachedFixture) {
      return ResponseService.success(
        res,
        'Fixture Successfully Retrieved',
        cachedFixture,
      )
    } else {
      const fixture = await fixtureService.getFixture(code)

      // Cache the fixture data
      await RedisService.setJson(`fixture:${code}`, fixture)

      return ResponseService.success(
        res,
        'Fixture Successfully Retrieved',
        fixture,
      )
    }
  },

  async listFixtures(req: Request, res: Response): Promise<{}> {
    const queryParams = { ...req.query }
    const cacheKey = JSON.stringify(queryParams)
    const cachedFixtures = await RedisService.getJson(`fixtures:${cacheKey}`)

    if (cachedFixtures) {
      return ResponseService.success(
        res,
        'Fixtures Successfully Retrieved',
        cachedFixtures,
      )
    } else {
      const data = await fixtureService.listFixtures(queryParams)

      // Cache the list of fixtures
      await RedisService.setJson(`fixtures:${cacheKey}`, data)

      return ResponseService.success(
        res,
        'Fixtures Successfully Retrieved',
        data,
      )
    }
  },
}
