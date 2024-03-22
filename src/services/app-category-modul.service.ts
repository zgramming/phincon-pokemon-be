import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import { prisma } from '@utils/prisma';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  name?: string;
}
interface AppCategoryModulCreateDTO {
  icon_id?: number;
  code: string;
  name: string;
  order: number;
  status: any;
  created_by: number;
}
interface AppCategoryModulUpdateDTO extends Partial<AppCategoryModulCreateDTO> {
  updated_by: number;
}

class AppCategoryModulService {
  async findAll({ limit, page, name }: FindAllQueryParams) {
    const result = await prisma.appCategoryModul.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        name: {
          contains: name,
        },
      },
    });

    const total = await prisma.appCategoryModul.count({
      where: {
        name: {
          contains: name,
        },
      },
    });

    return {
      data: result,
      total,
    };
  }

  async findById(id: number) {
    const result = await prisma.appCategoryModul.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(data: AppCategoryModulCreateDTO) {
    const result = await prisma.appCategoryModul.create({
      data: {
        ...data,
      },
    });

    return result;
  }

  async update(id: number, data: AppCategoryModulUpdateDTO) {
    const result = await prisma.appCategoryModul.update({
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
    const result = await prisma.appCategoryModul.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default AppCategoryModulService;
