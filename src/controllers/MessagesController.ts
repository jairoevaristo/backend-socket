import { Request, Response } from 'express';
import { MessagesServices } from '../services/MessagesServices';

class MessagesControler {
  async create(req: Request, res: Response) {
    const { admin_id, text, user_id } = req.body;
    const messagesServices = new MessagesServices();

    const messages = await messagesServices.create({
      admin_id,
      text,
      user_id
    });

    return res.status(201).json(messages);
  }

  async showByUser(req: Request, res: Response) {
    const { id } = req.params;
    const messagesServices = new MessagesServices();
    
    const list = await messagesServices.listByUser(id);

    return res.status(200).json({ list });
  }
}

export default new MessagesControler();