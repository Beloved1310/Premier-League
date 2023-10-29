declare class UnprocessableError extends Error {
    status: number;
    constructor(message: any);
}
export default UnprocessableError;
