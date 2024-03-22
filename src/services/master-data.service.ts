import { BaseQueryParamsDTO } from '@dto/base-query-params.dto';
import NotFoundError from '@utils/exceptions/notfound-error';
import { prisma } from '@utils/prisma';

interface FindAllQueryParams extends BaseQueryParamsDTO {
  name?: string;
  master_category_id?: string;
}
interface MasterDataCreateDTO {
  master_data_parent_id?: number;
  master_category_id: number;
  code: string;
  name: string;
  description: string;
  status: any;

  parameter1_key?: string;
  parameter1_value?: string;
  parameter2_key?: string;
  parameter2_value?: string;
  parameter3_key?: string;
  parameter3_value?: string;

  created_by: number;
}

interface MasterDataUpdateDTO extends Partial<MasterDataCreateDTO> {
  updated_by: number;
}

class MasterDataService {
  async findAll({ limit, page, name, master_category_id }: FindAllQueryParams) {
    const result = await prisma.masterData.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        name: {
          contains: name,
        },
        master_category_id: master_category_id ? +master_category_id : undefined,
      },
      include: {
        master_category: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
      },
    });

    const total = await prisma.masterData.count({
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
    const result = await prisma.masterData.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(data: MasterDataCreateDTO) {
    const masterCategory = await prisma.masterCategory.findUnique({
      where: {
        id: data.master_category_id,
      },
    });

    if (!masterCategory) {
      throw new NotFoundError('Master Category not found');
    }

    const result = await prisma.masterData.create({
      data: {
        ...data,
        master_category_id: masterCategory.id,
        master_category_code: masterCategory.code,
      },
    });

    return result;
  }

  async update(id: number, data: MasterDataUpdateDTO) {
    const masterData = await prisma.masterData.findUnique({
      where: {
        id: id,
      },
    });

    if (!masterData) {
      throw new NotFoundError('Master Data not found');
    }

    const masterCategory = await prisma.masterCategory.findUnique({
      where: {
        id: data.master_category_id,
      },
    });

    if (!masterCategory) {
      throw new NotFoundError('Master Category not found');
    }

    const result = await prisma.masterData.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        master_category_id: masterCategory.id,
        master_category_code: masterCategory.code,
      },
    });

    return result;
  }

  async delete(id: number) {
    const isExist = await prisma.masterData.findUnique({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new NotFoundError('Master Data not found');
    }

    const result = await prisma.masterData.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default MasterDataService;
