import AppCategoryModulService from '@services/app-category-modul.service';
import { Request, Response } from 'express';

class AppCategoryModulController {
  constructor(private appCategoryModulService: AppCategoryModulService) {}

  async get(req: Request, res: Response) {
    const query = req.query;
    const { page = 1, limit = 100 } = query || {};

    const result = await this.appCategoryModulService.findAll({
      page: +page,
      limit: +limit,
      name: query.name as string | undefined,
    });

    return res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.appCategoryModulService.findById(+id);

    return res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  }

  async create(req: Request, res: Response) {
    const data = req.body;

    const result = await this.appCategoryModulService.create(data);

    return res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(201);
  }

  async update(req: Request, res: Response) {
    const data = req.body;
    const { id } = req.params;

    const result = await this.appCategoryModulService.update(+id, data);

    return res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.appCategoryModulService.delete(+id);

    return res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  }
}

export default new AppCategoryModulController(new AppCategoryModulService());
