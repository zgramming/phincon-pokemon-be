import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import NotFoundError from '@utils/exceptions/notfound-error';
import { prisma } from '@utils/prisma';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  name?: string;
  modul_id?: number;
  category_modul_id?: number;
}
interface AppMenuCreateDTO {
  app_menu_id_parent?: number;
  app_modul_id: number;
  icon_id?: number;
  code: string;
  name: string;
  route: string;
  order: number;
  status: any;

  created_by: number;
}
interface AppMenuUpdateDTO extends Partial<AppMenuCreateDTO> {
  updated_by: number;
}

class AppMenuService {
  async findAll({ limit, page, name, category_modul_id, modul_id }: FindAllQueryParams) {
    const result = await prisma.appMenu.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        name: {
          contains: name,
        },
        app_category_modul_id: category_modul_id,
        app_modul_id: modul_id,
      },
      include: {
        app_category_modul: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        app_modul: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    const total = await prisma.appMenu.count({
      where: {
        name: {
          contains: name,
        },
        app_category_modul_id: category_modul_id,
        app_modul_id: modul_id,
      },
    });

    return {
      data: result,
      total,
    };
  }

  async findById(id: number) {
    const result = await prisma.appMenu.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(data: AppMenuCreateDTO) {
    const modul = await prisma.appModul.findUnique({
      where: {
        id: data.app_modul_id,
      },
    });

    if (!modul) {
      throw new NotFoundError('Modul not found');
    }

    const result = await prisma.appMenu.create({
      data: {
        ...data,
        app_category_modul_id: modul.app_category_modul_id,
      },
    });

    return result;
  }

  async update(id: number, data: AppMenuUpdateDTO) {
    const menu = await prisma.appMenu.findUnique({
      where: {
        id,
      },
    });

    if (!menu) {
      throw new NotFoundError('Menu not found');
    }

    const result = await prisma.appMenu.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return result;
  }

  async delete(id: number) {
    const menu = await prisma.appMenu.findUnique({
      where: {
        id,
      },
    });

    if (!menu) {
      throw new NotFoundError('Menu not found');
    }

    const result = await prisma.appMenu.delete({
      where: {
        id: menu.id,
      },
    });

    return result;
  }
}

export default AppMenuService;
