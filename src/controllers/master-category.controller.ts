import MasterCategoryService from '@services/master-category.service';
import { Request, Response } from 'express';

class MasterCategoryController {
  constructor(private masterCategoryService: MasterCategoryService) {}

  get = async (req: Request, res: Response) => {
    const query = req.query;
    const { page = 1, limit = 100 } = query || {};

    const result = await this.masterCategoryService.findAll({
      page: +page,
      limit: +limit,
      name: query.name as string | undefined,
    });

    res
      .json({
        error: false,
        meessage: 'Success',
        data: result,
      })
      .status(200);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.masterCategoryService.findById(+id);

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

    const result = await this.masterCategoryService.create(data);

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

    const result = await this.masterCategoryService.update(+id, data);

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

    const result = await this.masterCategoryService.delete(+id);

    res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  };
}

export default new MasterCategoryController(new MasterCategoryService());
