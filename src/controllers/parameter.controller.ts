import ParameterService from '@services/parameter.service';
import { Request, Response } from 'express';

class ParameterController {
  constructor(private parameterService: ParameterService) {}

  get = async (req: Request, res: Response) => {
    const query = req.query;
    const { page = 1, limit = 100 } = query || {};

    const result = await this.parameterService.findAll({
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
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.parameterService.findById(+id);

    return res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  };

  create = async (req: Request, res: Response) => {
    const data = req.body;

    const result = await this.parameterService.create(data);

    return res
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

    const result = await this.parameterService.update(+id, data);

    return res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.parameterService.delete(+id);

    return res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  };
}

export default new ParameterController(new ParameterService());
