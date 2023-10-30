import { fixtureRepository } from '../../api/repositories/fixture'
import Fixture from '../../api/model/fixture'

// Mock the Fixture module and its methods
jest.mock('../../api/model/fixture', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
  find: jest.fn(),
  countDocuments: jest.fn(),
}))

describe('fixtureRepository', () => {
  const sampleFixture = {
    homeTeam: 'AC Milan',
    awayTeam: 'Real Madrid',
    kickoffTime: Date.now(),
  }

  afterEach(() => {
    jest.clearAllMocks()
  })
})
