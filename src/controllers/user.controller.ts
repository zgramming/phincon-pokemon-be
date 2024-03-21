import UserService from '@services/user.service';
import { Request, Response } from 'express';

class UserController {
  constructor(private userService: UserService) {
    this.userService = userService;
  }

  async get(req: Request, res: Response) {
    const query = req.query;
    const page = query.page || 1;
    const limit = query.limit || 10;
    const name = query.name as string | undefined;

    const result = await this.userService.findAll({
      page: Number(page),
      limit: Number(limit),
      name,
    });

    return res
      .json({
        error: false,
        message: 'User list',
        data: result,
      })
      .status(200);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.userService.findById(Number(id));

    return res
      .json({
        error: false,
        message: 'User detail',
        data: result,
      })
      .status(200);
  }

  async create(req: Request, res: Response) {
    const data = req.body;

    const result = await this.userService.create(data);

    return res
      .json({
        error: false,
        message: 'User created',
        data: result,
      })
      .status(201);
  }

  async update(req: Request, res: Response) {
    const data = req.body;
    const { id } = req.params;

    const result = await this.userService.update(+id, data);

    return res
      .json({
        error: false,
        message: 'User updated',
        data: result,
      })
      .status(200);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.userService.delete(Number(id));

    return res
      .json({
        error: false,
        message: 'User deleted',
        data: result,
      })
      .status(200);
  }
}

export default new UserController(new UserService());
