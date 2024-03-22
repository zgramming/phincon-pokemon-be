import AppMenuService from '@services/app-menu.service';
import { Request, Response } from 'express';

class AppMenuController {
  constructor(private appMenuService: AppMenuService) {}

  get = async (req: Request, res: Response) => {
    const query = req.query;
    const page = query.page || 1;
    const limit = query.limit || 10;
    const name = query.name as string | undefined;
    const categoryModulId = query.category_modul_id as string | undefined;
    const modulId = query.modul_id as string | undefined;

    const { data: result, total } = await this.appMenuService.findAll({
      page: +page,
      limit: +limit,
      name: name,
      category_modul_id: categoryModulId ? +categoryModulId : undefined,
      modul_id: modulId ? +modulId : undefined,
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

    const result = await this.appMenuService.findById(+id);

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

    const result = await this.appMenuService.create(data);

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

    const result = await this.appMenuService.update(+id, data);

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

    const result = await this.appMenuService.delete(+id);

    res
      .json({
        error: false,
        message: 'Success',
        data: result,
      })
      .status(200);
  };
}

export default new AppMenuController(new AppMenuService());
