import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import { prisma } from '@utils/prisma';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  name?: string;
}

interface AppModulCreateDTO {
  app_category_modul_id: number;
  icon_id?: number;
  code: string;
  name: string;
  order: number;
  status: any;
  created_by: number;
}

interface AppModulUpdateDTO extends Partial<AppModulCreateDTO> {
  updated_by: number;
}

class AppModulService {
  async findAll({ limit, page, name }: FindAllQueryParams) {
    const result = await prisma.appModul.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        name: {
          contains: name,
        },
      },
    });

    return result;
  }

  async findById(id: number) {
    const result = await prisma.appModul.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(data: AppModulCreateDTO) {
    const result = await prisma.appModul.create({
      data: {
        ...data,
      },
    });

    return result;
  }

  async update(id: number, data: AppModulUpdateDTO) {
    const result = await prisma.appModul.update({
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
    const result = await prisma.appModul.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default AppModulService;
