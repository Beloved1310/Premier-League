import { Response } from 'express'; // Import Response from Express if not already imported

export const ResponseService = {
    success(res: Response, message: string, data: any = null, meta: any = null): {} {
        const payload: { message: string; status: boolean; error: boolean; data?: any; meta?: any } = {
          message,
          status: true,
          error: false,
        };
        if (data) payload.data = data;
        if (meta) payload.meta = meta;
        res.status(200).json(payload);
        return {};
      },

  failure(res: Response, message: string): {} {
    const payload = {
      message,
      status: false,
      error: true,
    };
    res.status(400).json(payload);
    return {};
  },

  notFound(res: Response, message: string): {} {
    const payload = {
      message,
      status: false,
      error: true,
    };
    res.status(404).json(payload);
    return {};
  },

  error(res: Response, message: string): {} {
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
