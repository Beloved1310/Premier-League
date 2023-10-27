import Team from '../model/team'

export const teamRepository = {
  async getOneTeam(item: {}) {
    const foundTeam = await Team.findOne( item )
    return foundTeam
  },
  async createTeam(createTeam: {}) {
    const team = await Team.create(createTeam)
    return team
  },

  async updateTeam(code: string, updateFields: {}) {
    const team = await Team.updateOne(
      { code },
      {
        $set: {
         ...updateFields
        },
      }
    )
    return team
  },

  async deleteTeam(code: string) {
    const team = await Team.deleteOne({ code })
    return team
  },

  async listTeams() {
    const team = await Team.find()
  // if no team
    return team
  },
}
