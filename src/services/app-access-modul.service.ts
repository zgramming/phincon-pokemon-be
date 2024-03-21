import InvariantError from '@utils/exceptions/invariant-error';
import NotFoundError from '@utils/exceptions/notfound-error';
import { prisma } from '@utils/prisma';

interface AppAccessModulCreateDTO {
  role_id: number;
  app_modul_id: number;
  created_by: number;
}

class AppAccessModulService {
  async createBulk(data: AppAccessModulCreateDTO[]) {
    if (data.length <= 0) {
      throw new InvariantError('Data cannot be empty');
    }

    const firstData = data[0];
    const modul = await prisma.appModul.findUnique({
      where: {
        id: firstData.app_modul_id,
      },
    });

    if (!modul) {
      throw new NotFoundError('Modul not found');
    }

    const mapping = data.map((item) => {
      return {
        ...item,
        app_category_modul_id: modul.app_category_modul_id,
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
