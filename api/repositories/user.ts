import User from '../model/user'

export const userRepository = {
  async getOneUser(email: string) {
    const user = await User.findOne({ email })
    return user
  },
  async createUser(createUser: {}) {
    const savedUser = await User.create(createUser)
    return savedUser
  },
}
