import { Router } from 'express';
import SettingController from '../controllers/SettingsController';

const settingsRouter = Router();

settingsRouter.post('/',SettingController.create);
settingsRouter.get('/:username',SettingController.findByUsername);
settingsRouter.put('/:username',SettingController.update);

export { settingsRouter };