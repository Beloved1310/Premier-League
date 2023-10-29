"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncErrorhandling = void 0;
const asyncErrorhandling = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (ex) {
            res.status(ex.status || 500).send({ message: ex.message });
            next(ex);
        }
    };
};
exports.asyncErrorhandling = asyncErrorhandling;
//# sourceMappingURL=async.js.map