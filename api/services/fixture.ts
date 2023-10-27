import { fixtureRepository } from '../repositories/fixture'
import { FixtureInput } from '../interfaces/fixture'
import ExistsError from '../utilis/exists-error'
import NotFoundError from '../utilis/not-found-error'

export const fixtureService = {
  async createFixture(payload: FixtureInput) {
    const Fixture = await fixtureRepository.getOneFixture({homeTeam: payload.homeTeam});
    if (Fixture) throw new ExistsError('Fixture')
    const createFixture = await fixtureRepository.createFixture(payload);
    return createFixture
  },

  async updateFixture(code: string, updateFields: {}) {
    const Fixture = await fixtureRepository.getOneFixture({code})
    if (!Fixture) throw new NotFoundError('Fixture')
    const createFixture = await fixtureRepository.updateFixture(code, updateFields)
    return createFixture
  },

  async deleteFixture(code: string) {
    const Fixture = await fixtureRepository.getOneFixture({code})
    if (!Fixture) throw new NotFoundError('Fixture')
    const deleteFixture = await fixtureRepository.deleteFixture(code)
    return deleteFixture
  },

  async listFixtures() {
    const listFixtures = await fixtureRepository.listFixtures()
    return listFixtures
  },
}
