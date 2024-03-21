import MasterDataService from '@services/master-data.service';
import { Request, Response } from 'express';

class MasterDataController {
  constructor(private masterDataService: MasterDataService) {}

  async get(req: Request, res: Response) {
    const query = req.query;
    const { page = 1, limit = 100 } = query || {};

    const result = await this.masterDataService.findAll({
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

    const result = await this.masterDataService.findById(+id);

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

    const result = await this.masterDataService.create(data);

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

    const result = await this.masterDataService.update(+id, data);

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

    const result = await this.masterDataService.delete(+id);

    return res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  }
}

export default new MasterDataController(new MasterDataService());
