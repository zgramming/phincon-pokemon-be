import MasterDataService from '@services/master-data.service';
import { Request, Response } from 'express';

class MasterDataController {
  constructor(private masterDataService: MasterDataService) {}

  get = async (req: Request, res: Response) => {
    const query = req.query;
    const page = query.page || 1;
    const limit = query.limit || 10;
    const name = query.name as string | undefined;
    const masterCategoryId = query.master_category_id as string | undefined;

    const { data: result, total } = await this.masterDataService.findAll({
      page: +page,
      limit: +limit,
      name,
      master_category_id: masterCategoryId,
    });

    res
      .json({
        error: false,
        message: 'Success',
        total,
        data: result,
      })
      .status(200);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.masterDataService.findById(+id);

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

    const result = await this.masterDataService.create(data);

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

    const result = await this.masterDataService.update(+id, data);

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

    const result = await this.masterDataService.delete(+id);

    res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  };
}

export default new MasterDataController(new MasterDataService());
