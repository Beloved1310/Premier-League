import Fixture from '../model/fixture'

export const fixtureRepository = {
  async getOneFixture(item: {}) {
    const foundFixture = await Fixture.findOne( item )
    return foundFixture
  },
  async createFixture(createFixture: {}) {
    const fixture = await Fixture.create(createFixture)
    return Fixture
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

  async listFixtures() {
    const fixtures =  await Fixture.find()
  // if no Fixture
    return fixtures
  },
}
