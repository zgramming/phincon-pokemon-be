import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import { prisma } from '@utils/prisma';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  name?: string;
}
interface MasterCategoryCreateDTO {
  master_category_id_parent?: number;
  code: string;
  name: string;
  description: string;
  status: any;
  created_by: number;
}
interface MasterCategoryUpdateDTO extends Partial<MasterCategoryCreateDTO> {
  updated_by: number;
}

class MasterCategoryService {
  async findAll({ limit, page, name }: FindAllQueryParams) {
    const result = await prisma.masterCategory.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    const total = await prisma.masterCategory.count({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    return {
      data: result,
      total,
    };
  }

  async findById(id: number) {
    const result = await prisma.masterCategory.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(data: MasterCategoryCreateDTO) {
    const result = await prisma.masterCategory.create({
      data: {
        ...data,
      },
    });

    return result;
  }

  async update(id: number, data: MasterCategoryUpdateDTO) {
    const result = await prisma.masterCategory.update({
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
    const result = await prisma.masterCategory.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default MasterCategoryService;
