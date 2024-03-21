import AppAccessMenuService from '@services/app-access-menu.service';
import { Request, Response } from 'express';

class AppAccessMenuController {
  constructor(private appAccessMenuService: AppAccessMenuService) {}

  createBulk = async (req: Request, res: Response) => {
    const data = req.body;

    const result = await this.appAccessMenuService.createBulk(data);

    return res
      .json({
        error: false,
        message: 'Data has been created',
        data: result,
      })
      .status(201);
  };
}

export default new AppAccessMenuController(new AppAccessMenuService());
