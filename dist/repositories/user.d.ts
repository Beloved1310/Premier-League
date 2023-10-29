export declare const userRepository: {
    getOneUser(email: string): Promise<import("../model/user").UserDocument | null>;
    createUser(createUser: {}): Promise<{
        id?: any;
        fullname: string;
        email: string;
        isAdmin: boolean;
        generateAuthToken: () => string;
    }>;
};
