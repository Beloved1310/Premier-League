import { teamRepository } from '../repositories/team'

import { TeamInput } from '../interfaces/team'
import ExistsError from '../utilis/exists-error'
import NotFoundError from '../utilis/not-found-error'

export const teamService = {
  async createTeam(payload: TeamInput) {
    const team = await teamRepository.getOneTeam({name: payload.name});
    if (team) throw new ExistsError('Team')
    const createTeam = await teamRepository.createTeam(payload);
    return createTeam
  },

  async updateTeam(code: string, updateFields: {}) {
    const team = await teamRepository.getOneTeam({code})
    if (!team) throw new NotFoundError('Team')
    const createTeam = await teamRepository.updateTeam(code, updateFields)
    return createTeam
  },

  async deleteTeam(code: string) {
    const team = await teamRepository.getOneTeam({code})
    if (!team) throw new NotFoundError('Team')
    const deleteTeam = await teamRepository.deleteTeam(code)
    return deleteTeam
  },

  async listTeams() {
    const listTeams = await teamRepository.listTeams()
    return listTeams
  },
}
