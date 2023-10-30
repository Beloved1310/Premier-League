import { teamRepository } from '../repositories/team'
import { Request, Response } from 'express'
import { TeamInput } from '../interfaces/team'
import ExistsError from '../utilis/exists-error'
import NotFoundError from '../utilis/not-found-error'

export const teamService = {
  async createTeam(payload: TeamInput) {
    const team = await teamRepository.getOneTeam({ name: payload.name })
    if (team) throw new ExistsError('Team')
    const createTeam = await teamRepository.createTeam(payload)
    return createTeam
  },

  async updateTeam(code: string, updateFields: {}) {
    const team = await teamRepository.getOneTeam({ code })
    if (!team) throw new NotFoundError('Team')
    const createTeam = await teamRepository.updateTeam(code, updateFields)
    return createTeam
  },

  async deleteTeam(code: string) {
    const team = await teamRepository.getOneTeam({ code })
    if (!team) throw new NotFoundError('Team')
    const deleteTeam = await teamRepository.deleteTeam(code)
    return deleteTeam
  },

  async getTeam(code: string) {
    const team = await teamRepository.getOneTeam({ code })
    if (!team) throw new NotFoundError('Team')
    return team
  },

  async listTeams(queryParams : any) {
    if (typeof queryParams.name === 'string') {
      queryParams.name = { $regex: queryParams.name, $options: 'i' }
    }

    if (typeof queryParams.founded === 'string') {
      queryParams.founded = parseInt(queryParams.founded)
    }

    if (typeof queryParams.countries === 'string') {
      queryParams.countries = { $regex: queryParams.countries, $options: 'i' }
    }

    // if (
    //   Array.isArray(queryParams.countries) ||
    //   typeof queryParams.countries === 'string'
    // ) {
    //   const countries = Array.isArray(queryParams.countries)
    //     ? queryParams.countries
    //     : [queryParams.countries]

    //   queryParams.country = { $in: countries }
    // }

    const listTeams = await teamRepository.listTeams(queryParams)
    return listTeams
  },
}
