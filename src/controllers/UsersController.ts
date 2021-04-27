import { Request, Response } from 'express';
import { UsersServices } from '../services/UsersServices';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const  usersServices = new UsersServices();

    const user = await usersServices.create(email);

    return res.status(201).json({ user });
  }
}

export default new UserController();