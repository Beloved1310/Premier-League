class ExistsError extends Error {
    status: number
    constructor(entity: string) {
        super();
        this.name = "ExistError";
        this.message = `${entity} already exists`;
        this.status = 409;
    }
}
export default ExistsError;
