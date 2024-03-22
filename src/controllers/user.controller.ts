import UserService from '@services/user.service';
import { Request, Response } from 'express';

class UserController {
  constructor(private userService: UserService) {}

  get = async (req: Request, res: Response) => {
    const query = req.query;
    const page = query.page || 1;
    const limit = query.limit || 10;
    const name = query.name as string | undefined;
    const role_id = query.role_id as string | undefined;

    const { data: result, total } = await this.userService.findAll({
      page: Number(page),
      limit: Number(limit),
      name,
      role_id: role_id ? Number(role_id) : undefined,
    });

    res
      .json({
        error: false,
        message: 'User list',
        data: result,
        total,
      })
      .status(200);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.userService.findById(Number(id));

    res
      .json({
        error: false,
        message: 'User detail',
        data: result,
      })
      .status(200);
  };

  create = async (req: Request, res: Response) => {
    const data = req.body;

    const result = await this.userService.create(data);

    res
      .json({
        error: false,
        message: 'User created',
        data: result,
      })
      .status(201);
  };

  update = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;

    const result = await this.userService.update(+id, data);

    res
      .json({
        error: false,
        message: 'User updated',
        data: result,
      })
      .status(200);
  };

  changePassword = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password } = req.body;

    const result = await this.userService.changePassword(+id, password);

    res
      .json({
        error: false,
        message: 'Password updated',
        data: result,
      })
      .status(200);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.userService.delete(Number(id));

    res
      .json({
        error: false,
        message: 'User deleted',
        data: result,
      })
      .status(200);
  };
}

const userController = new UserController(new UserService());

export default userController;
