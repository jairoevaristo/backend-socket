import { Request, Response } from 'express';
import { SettingsServices } from '../services/SettingsServices';

class SettingController {
  async create(req: Request, res: Response) {
    const { chat, username } = req.body;
    const settingsServices = new SettingsServices();
    
    try {
      const settings = await settingsServices.create({ chat, username });
      
      return res.status(201).json(settings);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async findByUsername(req: Request, res: Response) {
    const { username } = req.params;
    const settingsServices = new SettingsServices();

    const settings = await settingsServices.findByUsername(username);

    return res.status(200).json(settings);
  }
  
  async update(req: Request, res: Response) {
    const { username } = req.params;
    const { chat } = req.body;

    const settingsServices = new SettingsServices();

    const settings = await settingsServices.update(username, chat);

    return res.status(200).json(settings);
  }
}

export default new SettingController();