"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    var _a;
    if ((req === null || req === void 0 ? void 0 : req.user) && ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
        next();
    }
    else {
        res.status(403).send({ message: 'You do not have the right acess to perform this operation' });
    }
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=isAdmin.js.map