import { Router } from 'express';

import { settingsRouter } from './settingsRoutes';
import { usersRouter } from './usersRoutes';
import { messagesRouter } from './messagesRoutes';

const router = Router();

router.use('/settings', settingsRouter);
router.use('/users', usersRouter);
router.use('/messages', messagesRouter);

export { router };

