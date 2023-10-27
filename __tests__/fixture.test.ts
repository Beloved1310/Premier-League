import { fixtureService } from '../api/services/fixture';
import { FixtureInput } from '../api/interfaces/fixture';
import ExistsError from '../api/utilis/exists-error';
import NotFoundError from '../api/utilis/not-found-error';
import { fixtureRepository } from '../api/repositories/fixture';

// Mock the fixtureRepository methods
jest.mock('../api/repositories/fixture', () => ({
  fixtureRepository: {
    getOneFixture: jest.fn(),
    createFixture: jest.fn(),
    updateFixture: jest.fn(),
    deleteFixture: jest.fn(),
    listFixtures: jest.fn(),
  },
}));

describe('fixtureService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('createFixture - should create a new fixture', async () => {
    const payload: FixtureInput = {
        homeTeam: "Manchester United",
        awayTeam: "Liverpool",
        kickoffTime: "2023-11-01T19:00:00.000Z",
    };

    // Mock getOneFixture to return null (fixture doesn't exist)
    (fixtureRepository.getOneFixture as jest.Mock).mockResolvedValue(null);

    // Mock createFixture to return the created fixture
    (fixtureRepository.createFixture as jest.Mock).mockResolvedValue({
      _id: '1',
      ...payload,
    });

    const result = await fixtureService.createFixture(payload);

    expect(fixtureRepository.getOneFixture).toHaveBeenCalledWith({homeTeam: payload.homeTeam});
    expect(fixtureRepository.createFixture).toHaveBeenCalledWith(payload);
    expect(result).toEqual({ _id: '1', ...payload });
  });

  it('createFixture - should throw an error if the fixture already exists', async () => {
    const payload: FixtureInput = {
        homeTeam: "Manchester United",
        awayTeam: "Liverpool",
        kickoffTime: "2023-11-01T19:00:00.000Z",
    };

    // Mock getOneFixture to return an existing fixture
    (fixtureRepository.getOneFixture as jest.Mock).mockResolvedValue({
      _id: '1',
      ...payload,
    });

    try {
      await fixtureService.createFixture(payload);
    } catch (error) {
      const existsError = error as ExistsError;
      expect(existsError.message).toBe('Fixture already exists');
    }
  });

  it('updateFixture - should update an existing fixture', async () => {
    const code = 'fixtureCode';
    const updateFields = {
      status: 'completed',
      // Add other fields to update as needed
    };
    const existingFixture = {
      _id: '1',
      code,
      homeTeam: "Manchester United",
      awayTeam: "Liverpool",
      kickoffTime: "2023-11-01T19:00:00.000Z",
    };

    // Mock getOneFixture to return the existing fixture
    (fixtureRepository.getOneFixture as jest.Mock).mockResolvedValue(existingFixture);

    // Mock updateFixture to return the result of the update
    (fixtureRepository.updateFixture as jest.Mock).mockResolvedValue({
      nModified: 1,
    });

    const result = await fixtureService.updateFixture(code, updateFields);

    expect(fixtureRepository.getOneFixture).toHaveBeenCalledWith({ code });
    expect(fixtureRepository.updateFixture).toHaveBeenCalledWith(code, updateFields);
    expect(result).toEqual({ nModified: 1 });
  });

  it('updateFixture - should throw an error if the fixture does not exist', async () => {
    const code = 'NonExistentCode';

    // Mock getOneFixture to return null (fixture doesn't exist)
    (fixtureRepository.getOneFixture as jest.Mock).mockResolvedValue(null);

    try {
      await fixtureService.updateFixture(code, {});
    } catch (error) {
      const notFoundError = error as NotFoundError;
      expect(notFoundError.message).toBe('Fixture not found');
    }
  });

  it('deleteFixture - should delete an existing fixture', async () => {
    const code = 'fixtureCode'; // Use the code of the existing fixture

    // Mock getOneFixture to return the existing fixture
    (fixtureRepository.getOneFixture as jest.Mock).mockResolvedValue({
      _id: '1',
      code,
      name: 'Fixture 1',
      // Add other fields as needed
    });

    // Mock deleteFixture to return the result of the deletion
    (fixtureRepository.deleteFixture as jest.Mock).mockResolvedValue({
      deletedCount: 1,
    });

    const result = await fixtureService.deleteFixture(code);

    expect(fixtureRepository.getOneFixture).toHaveBeenCalledWith({ code });
    expect(fixtureRepository.deleteFixture).toHaveBeenCalledWith(code);
    expect(result).toEqual({ deletedCount: 1 });
  });

  it('deleteFixture - should throw an error if the fixture does not exist', async () => {
    const code = 'NonExistentCode';

    // Mock getOneFixture to return null (fixture doesn't exist)
    (fixtureRepository.getOneFixture as jest.Mock).mockResolvedValue(null);

    try {
      await fixtureService.deleteFixture(code);
    } catch (error) {
      const notFoundError = error as NotFoundError;
      expect(notFoundError.message).toBe('Fixture not found');
    }
  });

  it('listFixtures - should return a list of fixtures', async () => {
    const fixtures = [
      {
        _id: '1',
        code: 'fixtureCode1',
        homeTeam: "Manchester United",
        awayTeam: "Liverpool",
        kickoffTime: "2023-11-01T19:00:00.000Z",
      },
      {
        _id: '2',
        code: 'fixtureCode2',
        homeTeam: "Real Madrid",
        awayTeam: "Barcelona",
        kickoffTime: "2023-11-05T18:30:00.000Z",
      },
    ];

    // Mock listFixtures to return the list of fixtures
    (fixtureRepository.listFixtures as jest.Mock).mockResolvedValue(fixtures);
    const result = await fixtureService.listFixtures();
    expect(result).toEqual(fixtures);
  });
});
