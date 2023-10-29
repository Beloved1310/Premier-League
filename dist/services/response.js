"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
exports.ResponseService = {
    success(res, message, data = null, meta = null) {
        const payload = {
            message,
            status: true,
            error: false,
        };
        if (data)
            payload.data = data;
        if (meta)
            payload.meta = meta;
        res.status(200).json(payload);
        return {};
    },
    failure(res, message) {
        const payload = {
            message,
            status: false,
            error: true,
        };
        res.status(400).json(payload);
        return {};
    },
    notFound(res, message) {
        const payload = {
            message,
            status: false,
            error: true,
        };
        res.status(404).json(payload);
        return {};
    },
    error(res, message) {
        const payload = {
            message,
            status: false,
            error: true,
        };
        res.status(500).json(payload);
        return {};
    },
    //   json(res: Response, config: { message: string, status?: boolean, statusCode?: number, code?: number, data?: any }): {} {
    //     const payload = {
    //       message: config.message,
    //       status: config.status !== undefined ? config.status : true,
    //     };
    //     if (config.data) payload.data = config.data;
    //     res.status(config.statusCode || config.code).json(payload);
    //     return {};
    //   },
    //   plainJson(res: Response, config: { message: string, statusCode?: number, code?: number, data?: any }): {} {
    //     const payload = config;
    //     res.status(config.statusCode || config.code).json(payload);
    //     return {};
    //   },
};
//# sourceMappingURL=response.js.map