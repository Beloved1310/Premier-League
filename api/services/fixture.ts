import { fixtureRepository } from '../repositories/fixture'
import { teamRepository } from '../repositories/team'
import { FixtureInput } from '../interfaces/fixture'
import NotFoundError from '../utilis/not-found-error'

export const fixtureService = {
  async createFixture(payload: FixtureInput) {
    const fixture = await teamRepository.getOneTeam({name: payload.homeTeam});
    if (!fixture) throw new NotFoundError('Home Team Fixture')
    payload.homeTeam  = fixture._id

    const awayfixture = await teamRepository.getOneTeam({name: payload.awayTeam});
    if (!awayfixture) throw new NotFoundError('Away Team Fixture')
    payload.awayTeam  = awayfixture._id

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
  async listPendingFixtures(queryParams: any) {
    if (typeof queryParams.status === 'string') {
      queryParams.status = { $regex: queryParams.status, $options: 'i' }
    }
    const listFixtures = await fixtureRepository.listPendingFixtures(queryParams)
    return listFixtures
  },

  async listCompletedFixtures(queryParams: any) {
    if (typeof queryParams.status === 'string') {
      queryParams.status = { $regex: queryParams.status, $options: 'i' }
    }
    const listFixtures = await fixtureRepository.listCompletedFixtures(queryParams)
    return listFixtures
  },
  async listFixtures(queryParams: any) {
    if (typeof queryParams.awayTeam === 'string') {
      const awayTeamFixture = await teamRepository.getOneTeam({ name: { $regex: new RegExp(queryParams.awayTeam, 'i') } });
      queryParams.awayTeam = awayTeamFixture?._id;
  }
  
  if (typeof queryParams.homeTeam === 'string') {
      const homeTeamFixture = await teamRepository.getOneTeam({ name: { $regex: new RegExp(queryParams.homeTeam, 'i') } });
      queryParams.homeTeam = homeTeamFixture?._id;
  }  

  if (typeof queryParams.kickoffTime === 'string') {
      queryParams.kickoffTime = { $eq: queryParams.kickoffTime.toLowerCase() };
  }

  if (typeof queryParams.result === 'string') {
      queryParams.result = { $eq: queryParams.result.toLowerCase() };
  }
    const listFixtures = await fixtureRepository.listFixtures(queryParams)
    return listFixtures
  },
}
