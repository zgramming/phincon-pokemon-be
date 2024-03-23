import InvariantError from '@utils/exceptions/invariant-error';
import NotFoundError from '@utils/exceptions/notfound-error';
import { prisma } from '@utils/prisma';

interface AppAccessModulCreateDTO {
  role_id: number;
  app_category_modul_id: number;
  app_modul_id: number;
  created_by: number;
}

class AppAccessModulService {
  async findManyByRoleId(roleId: number) {
    const appGroupModul = await prisma.appAccessModul.findMany({
      where: {
        role_id: roleId,
      },
      include: {
        app_modul: true,
      },
    });
    const appGroupModulIds = appGroupModul.map((item) => item.app_modul_id);

    const modul = await prisma.appModul.findMany({
      include: {
        app_category_modul: true,
      },
    });

    const existInModul = modul.filter((item) => appGroupModulIds.includes(item.id));
    const notExistInModul = modul.filter((item) => !appGroupModulIds.includes(item.id));

    return {
      dataExist: existInModul,
      dataNotExist: notExistInModul,
    };
  }

  async createBulk(data: AppAccessModulCreateDTO[]) {
    if (data.length <= 0) {
      throw new InvariantError('Data cannot be empty');
    }

    const firstData = data[0];

    const mapping = data.map((item) => {
      return {
        ...item,
      };
    });

    const result = await prisma.$transaction(async (trx) => {
      // Delete all data by role_id then create new data
      await trx.appAccessModul.deleteMany({
        where: {
          role_id: firstData.role_id,
        },
      });

      return await trx.appAccessModul.createMany({
        data: mapping,
      });
    });

    return result;
  }
}

export default AppAccessModulService;
