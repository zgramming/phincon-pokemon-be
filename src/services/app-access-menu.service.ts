import InvariantError from '@utils/exceptions/invariant-error';
import NotFoundError from '@utils/exceptions/notfound-error';
import { prisma } from '@utils/prisma';

interface AppAccessMenuCreateDTO {
  role_id: number;
  app_menu_id: number;
  permission: string[];

  created_by: number;
}

class AppAccessMenuService {
  async createBulk(data: AppAccessMenuCreateDTO[]) {
    if (data.length <= 0) {
      throw new InvariantError('Data cannot be empty');
    }

    const firstData = data[0];
    const menu = await prisma.appMenu.findUnique({
      where: {
        id: firstData.app_menu_id,
      },
    });

    if (!menu) {
      throw new NotFoundError('Menu not found');
    }

    const mapping = data.map((item) => {
      return {
        ...item,
        app_category_modul_id: menu.app_category_modul_id,
        app_modul_id: menu.app_modul_id,
      };
    });

    const result = await prisma.$transaction(async (trx) => {
      // Delete all data by role_id then create new data
      await trx.appAccessMenu.deleteMany({
        where: {
          role_id: firstData.role_id,
        },
      });

      return await trx.appAccessMenu.createMany({
        data: mapping,
      });
    });

    return result;
  }
}

export default AppAccessMenuService;
