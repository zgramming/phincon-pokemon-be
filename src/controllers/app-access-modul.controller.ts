import AppAccessModulService from '@services/app-access-modul.service';
import { type Request, type Response } from 'express';

class AppAccessModulController {
  constructor(private appAccessModulService: AppAccessModulService) {}

  getByRoleId = async (req: Request, res: Response) => {
    const { roleId } = req.params;

    const { dataExist, dataNotExist } = await this.appAccessModulService.findManyByRoleId(+roleId);

    res
      .json({
        error: false,
        message: 'Data has been retrieved',
        dataExist,
        dataNotExist,
      })
      .status(200);
  };

  createBulk = async (req: Request, res: Response) => {
    const data = req.body;

    const result = await this.appAccessModulService.createBulk(data);

    res
      .json({
        error: false,
        message: 'Data has been created',
        data: result,
      })
      .status(201);
  };
}

export default new AppAccessModulController(new AppAccessModulService());
