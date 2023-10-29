declare class ValidationError extends Error {
    status: number;
    constructor(message: any);
}
export default ValidationError;
