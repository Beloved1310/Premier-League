export declare const RedisService: {
    getUserByEmail(email: string): Promise<void>;
    setJson(key: string, value: any): Promise<any>;
    getJson(key: string): Promise<any>;
    deleteJson(key: string): Promise<any>;
};
