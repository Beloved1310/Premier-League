import { UserInputRegister, UserInput } from '../interfaces/user';
export declare const userService: {
    createUser(createUser: UserInputRegister): Promise<{
        id?: any;
        fullname: string;
        email: string;
        isAdmin: boolean;
        generateAuthToken: () => string;
    }>;
    loginUser(loginUser: UserInput): Promise<string>;
};
