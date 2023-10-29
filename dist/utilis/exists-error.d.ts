declare class ExistsError extends Error {
    status: number;
    constructor(entity: string);
}
export default ExistsError;
