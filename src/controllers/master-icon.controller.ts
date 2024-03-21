import MasterIconService from '@services/master-icon.service';
import { Request, Response } from 'express';

class MasterIconController {
  constructor(private masterIconService: MasterIconService) {}

  get = async (req: Request, res: Response) => {
    const query = req.query;
    const { page = 1, limit = 100 } = query || {};

    const result = await this.masterIconService.findAll({
      page: Number(page),
      limit: Number(limit),
    });

    return res
      .json({
        error: false,
        message: 'Master Icon list',
        data: result,
      })
      .status(200);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.masterIconService.findById(Number(id));

    return res
      .json({
        error: false,
        message: 'Master Icon detail',
        data: result,
      })
      .status(200);
  };

  create = async (req: Request, res: Response) => {
    const data = req.body;

    const result = await this.masterIconService.create(data);

    return res
      .json({
        error: false,
        message: 'Master Icon created',
        data: result,
      })
      .status(201);
  };

  update = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;

    const result = await this.masterIconService.update(Number(id), data);

    return res
      .json({
        error: false,
        message: 'Master Icon updated',
        data: result,
      })
      .status(200);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.masterIconService.delete(Number(id));

    return res
      .json({
        error: false,
        message: 'Master Icon deleted',
        data: result,
      })
      .status(200);
  };
}

export default new MasterIconController(new MasterIconService());
