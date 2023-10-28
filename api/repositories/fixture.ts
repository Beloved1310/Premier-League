import Fixture from '../model/fixture'

export const fixtureRepository = {
  async getOneFixture(item: {}) {
    const foundFixture = await Fixture.findOne( item ).select('-_id -__v')
    return foundFixture
  },
  async createFixture(createFixture: {}) {
    const fixture = await Fixture.create(createFixture)
    const { _id, __v, ...data } = fixture.toObject();
    return data
  },

  async updateFixture(code: string, updateFields: {}) {
    const updateFixture = await Fixture.updateOne(
      { code },
      {
        $set: {
         ...updateFields
        },
      }
    )
    return updateFixture
  },

  async deleteFixture(code: string) {
    const deleteFixture = await Fixture.deleteOne({ code })
    return deleteFixture
  },

  async listFixtures(queryParams :any) {
    const perPage = 10;
    const page = parseInt(queryParams.page as string) || 1;
    const skip = (page - 1) * perPage;

    const [fixture, total] = await Promise.all([
        Fixture.find(queryParams)
            .skip(skip)
            .limit(perPage)
            .select('-_id -__v')
            .exec(),
        Fixture.countDocuments(queryParams).exec(),
    ]);
    const meta = {
      total,
      page,
      perPage,
      hasMore: total > page * perPage,
      nextPage: total > page * perPage ? page + 1 : null,
  };

  return { fixture, meta };
  }
}
