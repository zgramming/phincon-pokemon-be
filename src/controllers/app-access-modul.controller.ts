import AppAccessModulService from '@services/app-access-modul.service';
import { type Request, type Response } from 'express';

class AppAccessModulController {
  constructor(private appAccessModulService: AppAccessModulService) {}

  async createBulk(req: Request, res: Response) {
    const data = req.body;

    const result = await this.appAccessModulService.createBulk(data);

    return res
      .json({
        error: false,
        message: 'Data has been created',
        data: result,
      })
      .status(201);
  }
}

export default new AppAccessModulController(new AppAccessModulService());
