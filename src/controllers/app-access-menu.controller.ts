import AppAccessMenuService from '@services/app-access-menu.service';
import { Request, Response } from 'express';

class AppAccessMenuController {
  constructor(private appAccessMenuService: AppAccessMenuService) {}

  getByRoleId = async (req: Request, res: Response) => {
    const { roleId, categoryModulId } = req.params;

    const result = await this.appAccessMenuService.getByRoleId(Number(roleId), Number(categoryModulId));

    res.json({
      error: false,
      message: 'Data has been retrieved',
      data: result,
    });
  };

  createBulk = async (req: Request, res: Response) => {
    const data = req.body;

    const result = await this.appAccessMenuService.createBulk(data);

    res
      .json({
        error: false,
        message: 'Data has been created',
        data: result,
      })
      .status(201);
  };
}

export default new AppAccessMenuController(new AppAccessMenuService());
