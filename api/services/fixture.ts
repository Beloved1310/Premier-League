import { fixtureRepository } from '../repositories/fixture'
import { FixtureInput } from '../interfaces/fixture'
import ExistsError from '../utilis/exists-error'
import NotFoundError from '../utilis/not-found-error'

export const fixtureService = {
  async createFixture(payload: FixtureInput) {
    const fixture= await fixtureRepository.getOneFixture({homeTeam: payload.homeTeam});
    if (fixture) throw new ExistsError('Fixture')
    const createFixture= await fixtureRepository.createFixture(payload);
    return createFixture
  },

  async updateFixture(code: string, updateFields: {}) {
    const fixture= await fixtureRepository.getOneFixture({code})
    if (!fixture) throw new NotFoundError('Fixture')
    const createFixture= await fixtureRepository.updateFixture(code, updateFields)
    return createFixture
  },

  async deleteFixture(code: string) {
    const fixture= await fixtureRepository.getOneFixture({code})
    if (!fixture) throw new NotFoundError('Fixture')
    const deleteFixture= await fixtureRepository.deleteFixture(code)
    return deleteFixture
  },

  async getFixture(code: string) {
    const fixture= await fixtureRepository.getOneFixture({code})
    if (!fixture) throw new NotFoundError('Fixture')
    return fixture
  },
  async listFixtures(queryParams: any) {
    if (typeof queryParams.awayTeam === 'string') {
      queryParams.awayTeam = { $regex: queryParams.awayTeam, $options: 'i' }
    }

    if (typeof queryParams.homeTeam === 'string') {
      queryParams.homeTeam = { $regex: queryParams.homeTeam, $options: 'i' }
    }

    if (typeof queryParams.kickoffTime === 'string') {
      queryParams.kickoffTime = { $regex: queryParams.kickoffTime, $options: 'i' }
    }

    if (typeof queryParams.status === 'string') {
      queryParams.status = { $regex: queryParams.status, $options: 'i' }
    }

    if (typeof queryParams.result === 'string') {
      queryParams.result = { $regex: queryParams.result, $options: 'i' }
    }
    const listFixtures = await fixtureRepository.listFixtures(queryParams)
    return listFixtures
  },
}
