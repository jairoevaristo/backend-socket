import { Router } from 'express';
import MessagesController from '../controllers/MessagesController';

const messagesRouter = Router();

messagesRouter.get('/:id',MessagesController.showByUser);
messagesRouter.post('/',MessagesController.create);

export { messagesRouter };