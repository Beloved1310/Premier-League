"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExistsError extends Error {
    constructor(entity) {
        super();
        this.name = "ExistError";
        this.message = `${entity} already exists`;
        this.status = 409;
    }
}
exports.default = ExistsError;
//# sourceMappingURL=exists-error.js.map