declare class NotFoundError extends Error {
    status: number;
    constructor(entity: any);
}
export default NotFoundError;
