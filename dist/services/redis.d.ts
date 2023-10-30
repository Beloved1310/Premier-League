export declare const RedisService: {
    setJson(key: string, value: any): Promise<any>;
    getJson(key: string): Promise<any>;
    deleteJson(key: string): Promise<any>;
};
