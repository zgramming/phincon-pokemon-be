import RoleService from '@services/role.service';
import { Request, Response } from 'express';

class RoleController {
  constructor(private roleService: RoleService) {}

  async get(req: Request, res: Response) {
    const query = req.query;
    const page = query.page || 1;
    const limit = query.limit || 10;
    const name = query.name as string | undefined;

    const result = await this.roleService.findAll({
      page: Number(page),
      limit: Number(limit),
      name,
    });

    return res
      .json({
        error: false,
        message: 'Role list',
        data: result,
      })
      .status(200);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.roleService.findById(Number(id));

    return res
      .json({
        error: false,
        message: 'Role detail',
        data: result,
      })
      .status(200);
  }

  async create(req: Request, res: Response) {
    const data = req.body;

    const result = await this.roleService.create(data);

    return res
      .json({
        error: false,
        message: 'Role created',
        data: result,
      })
      .status(201);
  }

  async update(req: Request, res: Response) {
    const data = req.body;
    const { id } = req.params;
    const result = await this.roleService.update(+id, data);

    return res
      .json({
        error: false,
        message: 'Role updated',
        data: result,
      })
      .status(200);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.roleService.delete(Number(id));

    return res
      .json({
        error: false,
        message: 'Role deleted',
        data: result,
      })
      .status(200);
  }
}

export default new RoleController(new RoleService());
