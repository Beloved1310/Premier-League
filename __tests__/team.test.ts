import { teamService } from '../api/services/team'
import { TeamInput } from '../api/interfaces/team'
import ExistsError from '../api/utilis/exists-error'
import NotFoundError from '../api/utilis/not-found-error'
import { teamRepository } from '../api/repositories/team'

// Mock the teamRepository methods
jest.mock('../api/repositories/team', () => ({
  teamRepository: {
    getOneTeam: jest.fn(),
    createTeam: jest.fn(),
    updateTeam: jest.fn(),
    deleteTeam: jest.fn(),
    listTeams: jest.fn(),
  },
}))

describe('teamService', () => {
  let createdTeamCode: string = 'tem_kYaSPfyB7XJ3Xg9S3'
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('createTeam - should create a new team', async () => {
    const payload: TeamInput = {
      name: 'Manchester United',
      country: 'England',
      founded: 1990,
    }
    ;(teamRepository.createTeam as jest.Mock).mockResolvedValue({
      _id: '1',
      ...payload,
    })

    const result = await teamService.createTeam(payload)
    expect(teamRepository.getOneTeam).toHaveBeenCalledWith({
      name: payload.name,
    })
    expect(teamRepository.createTeam).toHaveBeenCalledWith(payload)
    expect(result).toEqual({ _id: '1', ...payload })
  })

  it('createTeam - should throw an error if the team already exists', async () => {
    const payload: TeamInput = {
      name: 'Manchester United',
      country: 'England',
      founded: 1990,
    }
    ;(teamRepository.createTeam as jest.Mock).mockResolvedValue({
      _id: '1',
      ...payload,
    })
    try {
      await teamService.createTeam(payload)
    } catch (error) {
      const existsError = error as ExistsError
      expect(existsError.message).toBe('Team already exists')
    }
  })

  it('updateTeam - should update an existing team', async () => {
    const code = createdTeamCode
    const updateFields = {
      name: 'Updated Team Name',
    }
    const existingTeam = {
      _id: '1',
      code,
      name: 'Manchester United',
      country: 'England',
      founded: 1990,
    }
    ;(teamRepository.getOneTeam as jest.Mock).mockResolvedValue(existingTeam)
    ;(teamRepository.updateTeam as jest.Mock).mockResolvedValue({
      nModified: 1,
    })

    const result = await teamService.updateTeam(code, updateFields)

    expect(teamRepository.getOneTeam).toHaveBeenCalledWith({ code })
    expect(teamRepository.updateTeam).toHaveBeenCalledWith(code, updateFields)
    expect(result).toEqual({ nModified: 1 })
  })

  it('deleteTeam - should delete an existing team', async () => {
    const code = createdTeamCode // Use the code of the created team

    ;(teamRepository.getOneTeam as jest.Mock).mockResolvedValue({
      _id: '1',
      code,
      name: 'Manchester United',
      country: 'England',
      founded: 1990,
    })
    ;(teamRepository.deleteTeam as jest.Mock).mockResolvedValue({
      deletedCount: 1,
    })

    const result = await teamService.deleteTeam(code)

    expect(teamRepository.getOneTeam).toHaveBeenCalledWith({ code })
    expect(teamRepository.deleteTeam).toHaveBeenCalledWith(code)
    expect(result).toEqual({ deletedCount: 1 })
  })

  it('deleteTeam - should throw an error if the team does not exist', async () => {
    const code = 'NonExistentCode'

    ;(teamRepository.getOneTeam as jest.Mock).mockResolvedValue(null)

    try {
      await teamService.deleteTeam(code)
    } catch (error) {
      const notFoundError = error as NotFoundError
      expect(notFoundError.message).toBe('Team not found')
    }
  })

  it('listTeams - should return a list of teams', async () => {
    // Define the expected teams to be returned by the mock
    const expectedTeams = [
      {
        _id: '1',
        code: 'tem_abc123',
        name: 'Team 1',
        country: 'Country 1',
        founded: 2000,
      },
      {
        _id: '2',
        code: 'tem_xyz456',
        name: 'Team 2',
        country: 'Country 2',
        founded: 2010,
      },
    ]

    // Mock the teamRepository.listTeams function to return the expected teams
    ;(teamRepository.listTeams as jest.Mock).mockResolvedValue({
      team: expectedTeams,
      meta: {
        total: expectedTeams.length,
        page: 1,
        perPage: expectedTeams.length,
        hasMore: false,
        nextPage: null,
      },
    })

    // Provide some sample queryParams
    const queryParams = {
      name: 'Manchester United',
    }

    // Call the listTeams function with the provided queryParams
    const result = await teamService.listTeams(queryParams)

    // Use jest matchers to make assertions
    expect(result.team).toEqual(expectedTeams) // Check if the result's team property matches the expected teams
    expect(teamRepository.listTeams).toHaveBeenCalledWith(queryParams) // Check if listTeams was called with the provided queryParams
  })
})
