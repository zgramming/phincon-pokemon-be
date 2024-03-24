import { AuthLoginResponseEntity } from '@entities/auth-login-response.entity';
import AuthService from '@services/auth.service';
import { Request, Response } from 'express';

class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const data = req.body;

    const result = await this.authService.login(data);

    res
      .json({
        error: false,
        message: 'Login success',
        data: result,
      })
      .status(200);
  };

  accessibleContent = async (req: Request, res: Response) => {
    const { roleId } = res.locals.user as AuthLoginResponseEntity;

    const result = await this.authService.accessibleContent(+roleId);

    res
      .json({
        error: false,
        message: 'Success fetching accessible content',
        data: result,
      })
      .status(200);
  };
}

export default new AuthController(new AuthService());
