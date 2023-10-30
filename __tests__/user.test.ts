import { userService } from '../api/services/user';
import { userRepository } from '../api/repositories/user';
import ValidationError from '../api/utilis/validation-error';
import UnprocessableError from '../api/utilis/not-processed-error';

import bcrypt from 'bcrypt';

jest.mock('bcrypt'); 

jest.mock('../api/repositories/user', () => ({
  userRepository: {
    getOneUser: jest.fn(),
    createUser: jest.fn(),
   
  },
}));

describe('userService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('createUser - should create a new user', async () => {
    const createUser = {
      fullname: 'Example Test',
      email: 'newuser@example.com',
      password: 'password123', 
    };

    // Mock getOneUser to return null (user doesn't exist)
    (userRepository.getOneUser as jest.Mock).mockResolvedValue(null);

    // Mock createUser to return the created user
    (userRepository.createUser as jest.Mock).mockResolvedValue(createUser);

    const result = await userService.createUser(createUser);

    expect(userRepository.getOneUser).toHaveBeenCalledWith(createUser.email);
    expect(userRepository.createUser).toHaveBeenCalledWith(createUser);
    expect(result).toEqual(createUser);
  });

  it('createUser - should throw an error if the user is already registered', async () => {
    const createUser = {
      fullname: 'Example Test',
      email: 'existinguser@example.com',
      password: 'password123'
    };

    // Mock getOneUser to return an existing user
    (userRepository.getOneUser as jest.Mock).mockResolvedValue({
      fullname: 'Example Test',
      email: 'existinguser@example.com',
      password: 'hashedPassword', // Mocked hashed password
    });

    try {
      await userService.createUser(createUser);
    } catch (error) {
      const validationError = error as ValidationError;
      expect(validationError.message).toBe('User already registered. Proceed to login');
    }
  });

  it('loginUser - should return a token for a valid user', async () => {
    const loginUser = {
      email: 'existinguser@example.com',
      password: 'password123',
    };

    // Mock getOneUser to return an existing user
    (userRepository.getOneUser as jest.Mock).mockResolvedValue({
      email: 'existinguser@example.com',
      password: 'hashedPassword', // Mocked hashed password
      generateAuthToken: jest.fn(),
    });

    // Mock bcrypt.compare to return true for a valid password
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

     await userService.loginUser(loginUser);

    expect(userRepository.getOneUser).toHaveBeenCalledWith(loginUser.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(loginUser.password, 'hashedPassword');
  });

  it('loginUser - should throw an error for an invalid password', async () => {
    const loginUser = {
      email: 'existinguser@example.com',
      password: 'invalidPassword',
    };

    // Mock getOneUser to return an existing user
    (userRepository.getOneUser as jest.Mock).mockResolvedValue({
      email: 'existinguser@example.com',
      password: 'hashedPassword', // Mocked hashed password
    });

    // Mock bcrypt.compare to return false for an invalid password
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    try {
      await userService.loginUser(loginUser);
    } catch (error) {
      const validationError = error as ValidationError;
      expect(validationError.message).toBe('Username or Password not found');
    }
  });

  it('loginUser - should throw an error for a non-existent user', async () => {
    const loginUser = {
      email: 'nonexistent@example.com',
      password: 'password123',
    };

    // Mock getOneUser to return null (user doesn't exist)
    (userRepository.getOneUser as jest.Mock).mockResolvedValue(null);

    try {
      await userService.loginUser(loginUser);
    } catch (error) {
      const validationError = error as ValidationError;
      expect(validationError.message).toBe('Username or Password not found');
    }
  });
});
