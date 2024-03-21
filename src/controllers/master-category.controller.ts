import MasterCategoryService from '@services/master-category.service';
import { Request, Response } from 'express';

class MasterCategoryController {
  constructor(private masterCategoryService: MasterCategoryService) {}

  async get(req: Request, res: Response) {
    const query = req.query;
    const { page = 1, limit = 100 } = query || {};

    const result = await this.masterCategoryService.findAll({
      page: +page,
      limit: +limit,
      name: query.name as string | undefined,
    });

    return res
      .json({
        error: false,
        meessage: 'Success',
        data: result,
      })
      .status(200);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.masterCategoryService.findById(+id);

    return res
      .json({
        error: false,
        meessage: 'Success',
        data: result,
      })
      .status(200);
  }

  async create(req: Request, res: Response) {
    const data = req.body;

    const result = await this.masterCategoryService.create(data);

    return res
      .json({
        error: false,
        meessage: 'Success',
        data: result,
      })
      .status(201);
  }

  async update(req: Request, res: Response) {
    const data = req.body;
    const { id } = req.params;

    const result = await this.masterCategoryService.update(+id, data);

    return res
      .json({
        error: false,
        meessage: 'Success',
        data: result,
      })
      .status(200);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.masterCategoryService.delete(+id);

    return res
      .json({
        error: false,
        meessage: 'Success',
        data: result,
      })
      .status(200);
  }
}

export default new MasterCategoryController(new MasterCategoryService());
