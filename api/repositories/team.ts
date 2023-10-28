import Team from '../model/team'

export const teamRepository = {
  async getOneTeam(item: {}) {
    const foundTeam = await Team.findOne( item ).select('-_id -__v')
    return foundTeam
  },
  async createTeam(createTeam: {}) {
    const team = await Team.create(createTeam)
    const { _id, __v, ...data } = team.toObject();
    return data
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

  async listTeams(queryParams : any) {
    const perPage = 10;
    const page = parseInt(queryParams.page as string) || 1;
    const skip = (page - 1) * perPage;

    const [team, total] = await Promise.all([
        Team.find(queryParams)
            .skip(skip)
            .limit(perPage)
            .select('-_id -__v')
            .exec(),
        Team.countDocuments(queryParams).exec(),
    ]);
    const meta = {
      total,
      page,
      perPage,
      hasMore: total > page * perPage,
      nextPage: total > page * perPage ? page + 1 : null,
  };

  return { team, meta };
  },
}
