import { AuthLoginResponseEntity } from '@entities/auth-login-response.entity';
import AuthenticationError from '@utils/exceptions/authentication-error';
import NotFoundError from '@utils/exceptions/notfound-error';
import { generateTokenJWT } from '@utils/helpers';
import { prisma } from '@utils/prisma';
import { compareSync } from 'bcrypt';

interface AuthLoginDTO {
  username: string;
  password: string;
}

class AuthService {
  async login(data: AuthLoginDTO) {
    const userByUsername = await prisma.users.findFirst({
      where: {
        username: data.username,
      },
    });

    if (!userByUsername) {
      throw new NotFoundError('User not found');
    }

    const checkPassword = compareSync(data.password, userByUsername.password);
    if (!checkPassword) {
      throw new AuthenticationError('Invalid password');
    }

    const payload: AuthLoginResponseEntity = {
      userId: userByUsername.id,
      username: userByUsername.username,
      roleId: userByUsername.role_id,
    };
    const token = generateTokenJWT(payload);

    return {
      token,
    };
  }

  async accessibleContent(roleId: number) {
    const accessibleModul = await prisma.appAccessModul.findMany({
      where: {
        role_id: roleId,
      },
      include: {
        app_modul: true,
      },
    });

    const accessibleMenu = await prisma.appAccessMenu.findMany({
      where: {
        role_id: roleId,
      },
      include: {
        app_menu: true,
      },
    });

    const getOnlyAppCategoryModulId = accessibleModul.map((item) => item.app_category_modul_id);
    const getOnlyAppModulId = accessibleMenu.map((item) => item.app_modul_id);
    const getOnlyAppMenuId = accessibleMenu.map((item) => item.app_menu_id);

    const uniqueAppCategoryModulId = [...new Set(getOnlyAppCategoryModulId)];
    const uniqueAppModulId = [...new Set(getOnlyAppModulId)];
    const uniqueAppMenuId = [...new Set(getOnlyAppMenuId)];

    const appCategoryModul = await prisma.appCategoryModul.findMany({
      where: {
        id: {
          in: uniqueAppCategoryModulId,
        },
      },
      include: {
        AppModul: {
          where: {
            id: {
              in: uniqueAppModulId,
            },
          },
          include: {
            icon: true,
            menus: {
              where: {
                id: {
                  in: uniqueAppMenuId,
                },
              },
            },
          },
        },
      },
    });

    const mapping = appCategoryModul.map((item) => {
      return {
        code: item.code,
        name: item.name,
        order: item.order,
        moduls: item.AppModul.map((modul) => {
          return {
            code: modul.code,
            name: modul.name,
            order: modul.order,
            icon: modul.icon?.icon_url,
            menus: modul.menus
              .filter((menu) => menu.app_menu_id_parent === null)
              .map((menu) => {
                return {
                  code: menu.code,
                  name: menu.name,
                  path: menu.route,
                  order: menu.order,
                  access: accessibleMenu.find((item) => item.app_menu_id === menu.id)?.permissions || [],
                  child: modul.menus
                    .filter((child) => child.app_menu_id_parent === menu.id)
                    .map((child) => {
                      return {
                        code: child.code,
                        name: child.name,
                        path: child.route,
                        order: child.order,
                        access: accessibleMenu.find((item) => item.app_menu_id === child.id)?.permissions || [],
                      };
                    }),
                };
              }),
          };
        }),
      };
    });

    return mapping;
  }
}

export default AuthService;
