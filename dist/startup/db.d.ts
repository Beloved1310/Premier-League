export declare const dbConnection: () => Promise<void>;
declare module 'mongoose' {
    interface ConnectOptions {
        useNewUrlParser?: boolean;
        useUnifiedTopology?: boolean;
        useCreateIndex?: boolean;
    }
}
