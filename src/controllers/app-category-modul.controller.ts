import AppCategoryModulService from '@services/app-category-modul.service';
import { Request, Response } from 'express';

class AppCategoryModulController {
  constructor(private appCategoryModulService: AppCategoryModulService) {}

  get = async (req: Request, res: Response) => {
    const query = req.query;
    const { page = 1, limit = 100 } = query || {};

    const { data: result, total } = await this.appCategoryModulService.findAll({
      page: +page,
      limit: +limit,
      name: query.name as string | undefined,
    });

    res
      .json({
        error: false,
        message: 'Success',
        data: result,
        total,
      })
      .status(200);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.appCategoryModulService.findById(+id);

    res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  };

  create = async (req: Request, res: Response) => {
    const data = req.body;

    const result = await this.appCategoryModulService.create(data);

    res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(201);
  };

  update = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;

    const result = await this.appCategoryModulService.update(+id, data);

    res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.appCategoryModulService.delete(+id);

    res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  };
}

export default new AppCategoryModulController(new AppCategoryModulService());
