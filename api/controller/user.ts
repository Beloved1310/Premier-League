import { Request, Response } from 'express';
import { userValidation } from '../validation/user';
import { userService } from '../services/user';
import { RedisService } from '../services/redis';
import { ResponseService } from '../services/response';


export const userController = {
  async register (req: Request, res: Response) : Promise<{}> {
    const { value, error } = userValidation.create.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    if(value.email === 'admin@prelea.com'){
      value.isAdmin = true;
    }
    const data = await userService.createUser(value)
    return ResponseService.success(res, 'Welcome! You have successfully sign up. Proceed to login', data);
  },

  async login (req: Request, res: Response) : Promise<{}> {
    const { value, error } = userValidation.login.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const { email } = value;
    const token = await userService.loginUser(value)
    res.header('authorization', token);
    const data = { email, token };
    return ResponseService.success(res, 'Login Successful', data);
  },
}
