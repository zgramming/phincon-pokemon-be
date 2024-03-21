import AuthService from '@services/auth.service';
import { Request, Response } from 'express';

class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const data = req.body;

    const result = await this.authService.login(data);

    return res
      .json({
        error: false,
        message: 'Login success',
        data: result,
      })
      .status(200);
  };

  accessibleContent = async (req: Request, res: Response) => {
    const { roleId } = req.params;

    const result = await this.authService.accessibleContent(+roleId);

    return res
      .json({
        error: false,
        message: 'Success fetching accessible content',
        data: result,
      })
      .status(200);
  };
}

export default new AuthController(new AuthService());
